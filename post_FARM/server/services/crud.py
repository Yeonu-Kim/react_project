from datetime import datetime

from sqlalchemy.orm import Session

from models.Question import Question, Answer
from schema.Answer import AnswerCreate

def get_question_list(db: Session):
    _question_list = db.query(Question).order_by(Question.create_date.desc()).all()

    return _question_list

def get_question(db: Session, question_id: int):
    question = db.query(Question).get(question_id)
    return question

def create_answer(db: Session, question: Question, answer_create: AnswerCreate):
    new_answer = Answer(question = question, content= answer_create.content, create_date=datetime.now())
    db.add(new_answer)
    db.commit()