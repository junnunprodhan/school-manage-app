use crate::database::{Id, Text};
use serde::{Deserialize, Serialize};

#[derive(sqlx::FromRow, Serialize, Deserialize, Debug)]
pub struct Parent {
    pub id: Id,
    pub name: Text,
    pub img: Option<Text>,
    pub profession: Option<Text>,
    // pub parent_type: Option<Text>,
    pub about_id: Id,
}
