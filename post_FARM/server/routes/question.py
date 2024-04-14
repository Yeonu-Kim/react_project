from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette import status

from models.config import get_db
from models.User import User
from services.crud import get_question_list, get_question, create_question
from routes.user import get_current_user
from schema.Question import Question as QuestionSchema
from schema.Question import QuestionCreate, QuestionList

router = APIRouter(
    prefix="/api/question"
)

@router.get("/list", response_model=QuestionList)
def question_list(db: Session = Depends(get_db), page: int = 0, size: int = 10):
    total, _question_list = get_question_list(db, skip=page*size, limit=size)
    ctx = {
        'total': total,
        'question_list': _question_list
    }

    return ctx

@router.get("/detail/{question_id}", response_model=QuestionSchema)
def question_detail(question_id: int, db: Session=Depends(get_db)):
    question = get_question(db, question_id=question_id)

    return question

@router.post("/create", status_code=status.HTTP_204_NO_CONTENT)
def question_create(_question_create:QuestionCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    create_question(db=db, question_create=_question_create, user=current_user)