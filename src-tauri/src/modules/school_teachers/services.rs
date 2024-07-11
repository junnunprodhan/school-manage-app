use super::super::teachers::schemas::Teacher;
use crate::database::{Connection, Id};
use crate::error::{Error, Result};

/// Add Teacher To School
///
///
pub async fn add_teacher_to_school(
    connection: &Connection,
    teacher_id: Id,
    school_id: Id,
) -> Result<Id> {
    let school_teacher_id = sqlx::query(
        r#"
        INSERT INTO `school_teachers` (`teacher_id`, `school_id`) VALUES (?, ?)
        "#,
    )
    .bind(teacher_id)
    .bind(school_id)
    .execute(connection)
    .await
    .map_err(|_| Error::Add {
        name: "TeacherToSchool".to_string(),
    })?
    .last_insert_rowid();

    Ok(school_teacher_id as Id)
}

/// Get School Teachers
///
///
pub async fn get_school_teachers(connection: &Connection, school_id: Id) -> Result<Vec<Teacher>> {
    let teachers = sqlx::query_as::<_,         Teacher>(
        r#"
        SELECT `teachers`.* From `teachers`
        LEFT JOIN `school_teachers` ON `school_teachers`.`teacher_id` = `teachers`.`id`
        WHERE `school_teachers`.`school_id` = ?
        "#,
    )
    .bind(school_id)
    .fetch_all(connection)
    .await
    .map_err(|_| Error::Gets {
        name: "Teachers".to_string(),
    })?;

    Ok(teachers)
}
