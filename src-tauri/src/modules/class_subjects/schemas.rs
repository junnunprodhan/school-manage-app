use crate::database::{Id, Text};
use serde::{Deserialize, Serialize};

#[derive(sqlx::FromRow, Serialize, Deserialize, Debug)]
pub struct ClassSubject {
    pub id: Id,
    pub name: Text,
    pub code: Text,
    pub class_id: Id,
}
