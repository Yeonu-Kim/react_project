from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status

from models.config import get_db
from models.User import User
from services.crud import get_question, create_answer
from routes.user import get_current_user
from schema.Answer import AnswerCreate


router = APIRouter(
    prefix="/api/answer"
)

@router.post("/create/{question_id}", status_code=status.HTTP_204_NO_CONTENT)
def answer_create(question_id: int, _answer_create: AnswerCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    question = get_question(db, question_id=question_id)
    if not question:
        raise HTTPException(status_code=404, detail="존재하지 않는 질문입니다.")
    
    create_answer(db, question=question, answer_create=_answer_create, user=current_user)