from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status

from models.config import get_db
from models.User import User
from services.crud import get_question, create_answer, get_answer, update_answer, delete_answer, vote_answer
from routes.user import get_current_user
from schema.Answer import AnswerCreate, Answer, AnswerUpdate, AnswerDelete, AnswerVote


router = APIRouter(
    prefix="/api/answer"
)

@router.post("/create/{question_id}", status_code=status.HTTP_204_NO_CONTENT)
def answer_create(question_id: int, _answer_create: AnswerCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    question = get_question(db, question_id=question_id)
    if not question:
        raise HTTPException(status_code=404, detail="존재하지 않는 질문입니다.")
    
    create_answer(db, question=question, answer_create=_answer_create, user=current_user)

@router.get("/detail/{answer_id}", response_model=Answer)
def answer_detail(answer_id: int, db: Session = Depends(get_db)):
    answer = get_answer(db, answer_id=answer_id)
    return answer

@router.put("/update", status_code=status.HTTP_204_NO_CONTENT)
def answer_update(_answer_update: AnswerUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_answer = get_answer(db, answer_id=_answer_update.answer_id)

    if not db_answer:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="존재하지 않는 답변입니다.")
    if current_user.id != db_answer.user.id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="수정 권한이 없습니다.")
    
    update_answer(db=db, db_answer=db_answer, answer_update=_answer_update)

@router.delete("/delete", status_code=status.HTTP_204_NO_CONTENT)
def answer_delete(_answer_delete: AnswerDelete, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_answer = get_answer(db, answer_id=_answer_delete.answer_id)

    if not db_answer:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="답변을 찾을 수 없습니다.")
    if current_user.id != db_answer.user.id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="삭제 권한이 없습니다.")
    
    delete_answer(db=db, db_answer=db_answer)

@router.post("/vote", status_code=status.HTTP_204_NO_CONTENT)
def answer_vote(_answer_vote: AnswerVote, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_answer = get_answer(db, answer_id=_answer_vote.answer_id)

    if not db_answer:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="답변을 찾을 수 없습니다.")
    
    vote_answer(db, db_answer=db_answer, db_user=current_user)