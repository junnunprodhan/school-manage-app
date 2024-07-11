use crate::database::{Id, Text};
use serde::{Serialize, Deserialize};

#[derive(sqlx::FromRow, Serialize, Deserialize, Debug)]
pub struct School {
    pub id: Id,
    pub name: Text,
    pub img: Option<Text>,
    pub about_id: Id
}

#[derive(Debug)]
pub struct SchoolCreatePayload {
    pub name: Text,
}
