use crate::database::{Id, Text};
use serde::{Deserialize, Serialize};

// #[derive(Debug)]
// pub enum ParentType {
//     Father,
//     Mother,
//     Brother,
//     Sister,
//     Other,
// }

#[derive(sqlx::FromRow, Serialize, Deserialize, Debug)]
pub struct StudentParent {
    pub parent_type: Text, // ParentType,
    pub student_id: Id,
    pub parent_id: Id,
}
