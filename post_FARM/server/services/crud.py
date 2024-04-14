from datetime import datetime

from sqlalchemy.orm import Session

from models.Question import Question, Answer
from schema.Answer import AnswerCreate
from schema.Question import QuestionCreate

def get_question_list(db: Session, skip: int = 0, limit: int = 10):
    _question_list = db.query(Question).order_by(Question.create_date.desc())

    total = _question_list.count()
    question_list = _question_list.offset(skip).limit(limit).all()
    return total, question_list

def get_question(db: Session, question_id: int):
    question = db.query(Question).get(question_id)
    return question

def create_answer(db: Session, question: Question, answer_create: AnswerCreate):
    new_answer = Answer(question = question, content= answer_create.content, create_date=datetime.now())
    db.add(new_answer)
    db.commit()

def create_question(db: Session, question_create: QuestionCreate):
    new_question = Question(subject=question_create.subject, content=question_create.content, create_date=datetime.now())
    db.add(new_question)
    db.commit()