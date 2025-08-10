from fastapi import UploadFile
import aiofiles
import os
import uuid
from pathlib import Path

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

async def save_upload_file(upload_file: UploadFile) -> Path:
    """
    Saves an uploaded file to the UPLOAD_DIR and returns the file path.
    """
    # Create a unique filename to prevent overwrites and security issues
    ext = Path(upload_file.filename).suffix
    unique_filename = f"{uuid.uuid4()}{ext}"
    file_path = UPLOAD_DIR / unique_filename

    try:
        async with aiofiles.open(file_path, 'wb') as out_file:
            while content := await upload_file.read(1024):  # Read in chunks
                await out_file.write(content)
    finally:
        await upload_file.close()

    return file_path
