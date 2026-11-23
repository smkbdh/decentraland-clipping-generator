"""Skin the wrapped robe so the lower body can move (it used to be a rigid piece parented to the Spine bone).

    blender -b AI_BUDDAH_MASTER.blend --python build_robe_rig.py -- out.blend

* adds a `Skirt` bone (child of Pelvis, pivot at the waist) that swings the hem as one bell,
* skins `Wrapped robe` with an Armature modifier: chest -> spine -> pelvis down the torso, and the skirt
  below the waist growing toward the hem,
* keeps the robe's existing modifiers (the sleeve-reveal geometry nodes) after the armature.
Episodes animate Pelvis/legs (weight shift) and Skirt (spring follow-through) in build_linked_episode.py.
Re-running rebuilds the bone and weights (idempotent).
"""
import bpy, sys
import numpy as np
from mathutils import Vector

ARM = bpy.data.objects["Armature_Buddah"]
ROBE = bpy.data.objects["Wrapped robe"]
WAIST_Z, HEM_Z = .98, .40


def sstep(a, b, x):
    t = np.clip((x - a) / (b - a), 0, 1)
    return t * t * (3 - 2 * t)


def add_bone():
    bpy.ops.object.select_all(action="DESELECT")
    bpy.context.view_layer.objects.active = ARM; ARM.select_set(True)
    bpy.ops.object.mode_set(mode="EDIT")
    eb = ARM.data.edit_bones
    b = eb.get("Skirt") or eb.new("Skirt")
    b.head = Vector((0, 0, WAIST_Z)); b.tail = Vector((0, 0, HEM_Z))
    b.roll = 0
    b.parent = eb["Pelvis"]; b.use_connect = False; b.use_deform = True
    bpy.ops.object.mode_set(mode="OBJECT")


def skin_robe():
    mw = ROBE.matrix_world.copy()
    ROBE.parent = ARM
    ROBE.parent_type = "OBJECT"
    ROBE.parent_bone = ""
    ROBE.matrix_world = mw
    for name in ("Chest", "Spine", "Pelvis", "Skirt"):
        g = ROBE.vertex_groups.get(name)
        if g:
            ROBE.vertex_groups.remove(g)
    groups = {n: ROBE.vertex_groups.new(name=n) for n in ("Chest", "Spine", "Pelvis", "Skirt")}
    co = np.array([tuple(ROBE.matrix_world @ v.co) for v in ROBE.data.vertices])
    z = co[:, 2]
    chest = sstep(1.30, 1.50, z)                       # top of the robe rides with the chest
    spine = (1 - chest) * sstep(.90, 1.08, z)          # torso
    lower = 1 - chest - spine                          # waist and below
    skirt = lower * sstep(WAIST_Z - .02, HEM_Z + .12, z) ** .9
    pelvis = lower - skirt
    for name, w in (("Chest", chest), ("Spine", spine), ("Pelvis", pelvis), ("Skirt", skirt)):
        g = groups[name]
        for i in np.flatnonzero(w > 1e-4):
            g.add([int(i)], float(w[i]), "REPLACE")
    mod = ROBE.modifiers.get("Robe skinning") or ROBE.modifiers.new("Robe skinning", "ARMATURE")
    mod.object = ARM
    mod.use_vertex_groups = True
    mod.use_deform_preserve_volume = False
    with bpy.context.temp_override(object=ROBE):
        bpy.ops.object.modifier_move_to_index(modifier=mod.name, index=0)


def main():
    out = sys.argv[sys.argv.index("--") + 1] if "--" in sys.argv else bpy.data.filepath
    add_bone()
    skin_robe()
    bpy.ops.wm.save_as_mainfile(filepath=out)
    print("SAVED", out)


main()
