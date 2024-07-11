use super::schemas::{StudentAttendence, StudentAttendenceWithStudent};
use crate::database::Id;
use crate::error::Result;
use crate::system::TauriApp;
use tauri::State;

#[tauri::command]
pub async fn create_student_attendence(
    state: State<'_, TauriApp>,
    present: bool,
    date: &str,
    student_id: Id,
    class_id: Id,
) -> Result<Id> {
    let admin = state.admin.lock().await;
    let student_attendence_id = super::services::create_student_attendence(
        admin.connection(),
        present,
        date,
        class_id,
        student_id,
    )
    .await?;

    Ok(student_attendence_id)
}

#[tauri::command]
pub async fn take_student_attendences(
    state: State<'_, TauriApp>,
    attendences: Vec<(Id, bool)>,
    date: &str,
    class_id: Id,
) -> Result<()> {
    let admin = state.admin.lock().await;

    for (student_id, present) in attendences.into_iter() {
        super::services::create_student_attendence(
            admin.connection(),
            present,
            date,
            class_id,
            student_id,
        )
        .await?;
    }

    Ok(())
}

#[tauri::command]
pub async fn get_class_attendences(
    state: State<'_, TauriApp>,
    date: &str,
    class_id: Id,
) -> Result<Vec<StudentAttendenceWithStudent>> {
    let admin = state.admin.lock().await;
    let class_attendences =
        super::services::get_class_attendences(admin.connection(), date, class_id).await?;

    Ok(class_attendences)
}

#[tauri::command]
pub async fn get_student_attendences(
    state: State<'_, TauriApp>,
    month: i32,
    year: i32,
    class_id: Id,
    student_id: Id,
) -> Result<Vec<StudentAttendence>> {
    let admin = state.admin.lock().await;
    let student_attendences = super::services::get_student_attendences(
        admin.connection(),
        month,
        year,
        student_id,
        class_id,
    )
    .await?;

    Ok(student_attendences)
}



#[tauri::command]
pub async fn update_student_attendence(
    state: State<'_, TauriApp>,
    present: bool,
    date: &str,
    student_id: Id,
    class_id: Id,
) -> Result<bool> {
    let admin = state.admin.lock().await;
    let student_attendence_updated = super::services::update_student_attendence(
        admin.connection(),
        present,
        date,
        class_id,
        student_id,
    )
    .await?;

    Ok(student_attendence_updated)
}

#[tauri::command]
pub async fn update_student_attendences(
    state: State<'_, TauriApp>,
    attendences: Vec<(Id, bool)>,
    date: &str,
    class_id: Id,
) -> Result<()> {
    let admin = state.admin.lock().await;

    for (student_id, present) in attendences.into_iter() {
        super::services::update_student_attendence(
            admin.connection(),
            present,
            date,
            class_id,
            student_id,
        )
        .await?;
    }

    Ok(())
}


#[tauri::command]
pub async fn is_class_attendences_taken(
    state: State<'_, TauriApp>,
    date: &str,
    class_id: Id,
) -> Result<bool> {
    let admin = state.admin.lock().await;
    let class_attendences =
        super::services::get_class_attendences(admin.connection(), date, class_id).await?;

    Ok(class_attendences.len() != 0)
}