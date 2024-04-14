from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status

from models.config import get_db
from models.User import User
from services.crud import get_question_list, get_question, create_question, update_question, delete_question, vote_question
from routes.user import get_current_user
from schema.Question import Question as QuestionSchema
from schema.Question import QuestionCreate, QuestionList, QuestionUpdate, QuestionDelete, QuestionVote

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

@router.put("/update", status_code=status.HTTP_204_NO_CONTENT)
def question_update(_question_update: QuestionUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_question = get_question(db, question_id=_question_update.question_id)

    if not db_question:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="질문을 찾을 수 없습니다.")
    if current_user.id != db_question.user.id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="수정 권한이 업습니다.")
    
    update_question(db=db, db_question=db_question, question_update=_question_update)

@router.delete("/delete", status_code=status.HTTP_204_NO_CONTENT)
def question_delete(_question_delete: QuestionDelete, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_question = get_question(db, question_id = _question_delete.question_id)

    if not db_question:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="질문을 찾을 수 없습니다.")
    if current_user.id != db_question.user.id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="삭제 권한이 없습니다.")
    
    delete_question(db=db, db_question=db_question)

@router.post("/vote", status_code=status.HTTP_204_NO_CONTENT)
def question_vote(_question_vote: QuestionVote, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_question = get_question(db, question_id=_question_vote.question_id)

    if not db_question:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="질문을 찾을 수 없습니다.")

    vote_question(db, db_question=db_question, db_user=current_user)
