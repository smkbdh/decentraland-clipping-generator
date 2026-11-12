"""
Kino MCP Client Bridge for Antigravity & automated workflows.
Connects directly to the Kino Desktop MCP server at http://127.0.0.1:45680/mcp
"""

import json
import urllib.request
from typing import Any, Dict, Optional

KINO_MCP_URL = "http://127.0.0.1:45680/mcp"


def call_kino(name: str, arguments: Optional[Dict[str, Any]] = None, req_id: int = 1) -> Dict[str, Any]:
    """Call any Kino MCP tool by name with arguments."""
    payload = {
        "jsonrpc": "2.0",
        "id": req_id,
        "method": "tools/call",
        "params": {
            "name": name,
            "arguments": arguments or {}
        }
    }
    req = urllib.request.Request(
        KINO_MCP_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "Accept": "application/json, text/event-stream"
        }
    )
    with urllib.request.urlopen(req) as resp:
        for line in resp:
            line_str = line.decode("utf-8").strip()
            if line_str.startswith("data:"):
                data = json.loads(line_str[5:].strip())
                if "error" in data:
                    raise RuntimeError(f"Kino MCP Error: {data['error']}")
                return data.get("result", {})
    return {}


def get_current_context() -> Dict[str, Any]:
    """Get active project, composition size, and mountDir."""
    res = call_kino("getCurrentKinoContext")
    return res.get("structuredContent") or res


def list_projects() -> list:
    """List recent projects in Kino."""
    res = call_kino("listProjects")
    sc = res.get("structuredContent", {})
    return sc.get("projects", [])


def get_timeline(project_id: str) -> Dict[str, Any]:
    """Get clips, playhead, and selection on the timeline."""
    res = call_kino("timelineGet", {"projectId": project_id})
    return res.get("structuredContent") or res


def add_media(project_id: str, file_path: str):
    """Import media into Kino."""
    return call_kino("addMediaToKino", {"projectId": project_id, "filePath": file_path})


def take_screenshot(project_id: str, timestamp_s: float = 0.0):
    """Render a screenshot of the project Remotion composition."""
    return call_kino("projectScreenshot", {"projectId": project_id, "timestamp": timestamp_s})


if __name__ == "__main__":
    ctx = get_current_context()
    print("Connected to Kino! Context:")
    print(json.dumps(ctx, indent=2, ensure_ascii=False))
