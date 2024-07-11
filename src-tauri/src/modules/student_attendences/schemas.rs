use serde::{Deserialize, Serialize};
use crate::database::{Text, Int};

#[derive(sqlx::FromRow, Serialize, Deserialize, Debug)]
pub struct StudentAttendence {
    pub id: Int,
    pub present: i8,
    pub date: Text,
    pub class_id: Int,
    pub student_id: Int,
}

#[derive(sqlx::FromRow, Serialize, Deserialize, Debug)]
pub struct StudentAttendenceWithStudent {
    pub present: i8,
    pub id: Option<Int>,
    pub name: Option<Text>,
    pub img: Option<Text>,
}