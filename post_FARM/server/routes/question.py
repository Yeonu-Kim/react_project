from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette import status

from models.config import get_db
from services.crud import get_question_list, get_question
from schema.Question import Question as QuestionSchema

router = APIRouter(
    prefix="/api/question"
)

@router.get("/list", response_model=list[QuestionSchema])
def question_list(db: Session = Depends(get_db)):
    _question_list = get_question_list(db)

    return _question_list

@router.get("/detail/{question_id}", response_model=QuestionSchema)
def question_detail(question_id: int, db: Session=Depends(get_db)):
    question = get_question(db, question_id=question_id)

    return question

