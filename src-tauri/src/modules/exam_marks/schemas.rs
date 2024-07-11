use crate::database::{Id, Text, Int};
use serde::{Serialize, Deserialize};

#[derive(sqlx::FromRow, Serialize, Deserialize, Debug)]
pub struct ExamMark {
    pub id: Id,
    pub objective_mark: Int,
    pub subjective_mark: Int,
    pub practical_mark: Int,
    pub comment: Text,
    pub subject_id: Id,
    pub student_id: Id,
    pub exam_id: Id,
}

#[derive(sqlx::FromRow, Serialize, Deserialize, Debug)]
pub struct ExamMarkWithSubject {
    pub id: Id,
    pub objective_mark: Int,
    pub subjective_mark: Int,
    pub practical_mark: Int,
    pub comment: Text,
    pub subject_id: Id,
    pub student_id: Id,
    pub exam_id: Id,
    pub subject_name: Option<Text>,
    pub subject_code: Option<Text>
}

#[derive(sqlx::FromRow, Serialize, Deserialize, Debug)]
pub struct ExamMarkWithStudentAndSubject {
    pub id: Id,
    pub objective_mark: Int,
    pub subjective_mark: Int,
    pub practical_mark: Int,
    pub comment: Text,
    pub subject_id: Id,
    pub student_id: Id,
    pub exam_id: Id,
    pub student_name: Option<Text>,
    pub student_img: Option<Text>,
    pub subject_name: Option<Text>,
    pub subject_code: Option<Text>
}