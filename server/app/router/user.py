from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from ..dependencies import get_current_user_id
from ..services.file_service import save_upload_file
from ..models.interview import UploadedDocumentModel
from ..database.mongo import add_document_to_user

router = APIRouter(
    prefix="/users",
    tags=["users"],
)

@router.post("/documents/upload")
async def upload_user_document(
    file: UploadFile = File(...),
    document_type: str = Form(...),
    user_id: str = Depends(get_current_user_id)
):
    """
    Uploads a document (resume or job description) for the authenticated user.
    """
    if document_type not in ["resume", "job_description"]:
        raise HTTPException(status_code=400, detail="Invalid document_type. Must be 'resume' or 'job_description'.")

    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided.")

    # Save the uploaded file
    file_path = await save_upload_file(upload_file=file)

    # Create the document model to be inserted into the DB
    document_data = UploadedDocumentModel(
        file_name=file.filename,
        file_path=str(file_path),
        document_type=document_type
    )

    # Update the user's document list in the database
    success = await add_document_to_user(user_id, document_data)

    if not success:
        # This could happen if the user_id is invalid, though the dependency should prevent that.
        raise HTTPException(status_code=404, detail="User not found or could not update documents.")

    return {
        "message": "File uploaded successfully",
        "file_name": file.filename,
        "path": str(file_path),
        "document_type": document_type
    }
