use super::super::school_teachers;
use super::schemas::Teacher;
use crate::database::Id;
use crate::error::Result;
use crate::system::TauriApp;
use tauri::State;

#[tauri::command]
pub async fn create_teacher(
    state: State<'_, TauriApp>,
    name: &str,
    img: &str,
    about_id: Id,
) -> Result<Id> {
    let admin = state.admin.lock().await;
    let teacher_id =
        super::services::create_teacher(admin.connection(), name, img, about_id).await?;

    Ok(teacher_id)
}

#[tauri::command]
pub async fn get_teacher(state: State<'_, TauriApp>, teacher_id: Id) -> Result<Teacher> {
    let admin = state.admin.lock().await;
    let teacher = super::services::get_teacher(admin.connection(), teacher_id).await?;

    Ok(teacher)
}

#[tauri::command]
pub async fn get_teachers(state: State<'_, TauriApp>) -> Result<Vec<Teacher>> {
    let admin = state.admin.lock().await;
    let teachers = super::services::get_teachers(admin.connection()).await?;

    Ok(teachers)
}

#[tauri::command]
pub async fn add_teacher(
    state: State<'_, TauriApp>,
    //
    name: &str,
    img: &str,
    // about
    birth: &str,
    gender: &str,
    address: &str,
    number: &str,
    // login
    email: &str,
    password: &str,
) -> Result<Id> {
    let admin = state.admin.lock().await;
    let about_id = super::super::abouts::services::create_about(
        admin.connection(),
        birth,
        gender,
        address,
        number,
        email,
        password,
    )
    .await?;
    let teacher_id =
        super::services::create_teacher(admin.connection(), name, img, about_id).await?;

    school_teachers::services::add_teacher_to_school(
        admin.connection(),
        teacher_id,
        admin.school_id(),
    )
    .await?;

    Ok(teacher_id)
}
