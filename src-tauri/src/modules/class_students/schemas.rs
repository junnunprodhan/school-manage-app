use crate::database::{Id, Text, Int};
use serde::{Deserialize, Serialize};

#[derive(sqlx::FromRow, Serialize, Deserialize, Debug)]
pub struct ClassStudent {
    pub roll: Int,
    pub section: Text, // ClassSection,
    pub section_roll: Int,
    pub year: Int,
    pub class_id: Id,
    pub student_id: Id,
}

#[derive(sqlx::FromRow, Serialize, Deserialize, Debug)]
pub struct StudentWithClass {
    pub id: Option<Int>,
    pub name: Option<Text>,
    pub img: Option<Text>,
    pub class_name: Option<Text>,
    pub roll: Option<Int>,
    pub section: Option<Text>, // ClassSection,
    pub section_roll: Option<Int>,
    pub year: Option<Int>,
}

#[derive(sqlx::FromRow, Serialize, Deserialize, Debug)]
pub struct StudentClass {
    pub name: Option<Text>,
    pub roll: Option<Int>,
    pub section: Option<Text>, // ClassSection,
    pub section_roll: Option<Int>,
    pub year: Option<Int>,
}
