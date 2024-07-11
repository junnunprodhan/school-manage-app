use crate::database::Connection;
use crate::error::{Error, Result};

pub async fn create_tables(connection: &Connection) -> Result<()> {
    let _res = sqlx::query(
      r#"
      CREATE TABLE `abouts` (
        `id` INTEGER NOT NULL,
        `birth` TEXT NOT NULL,
        `gender` TEXT DEFAULT NULL,
        `address` TEXT NOT NULL,
        `number` TEXT NOT NULL,
        `email` TEXT NOT NULL,
        `password` TEXT NOT NULL,
        PRIMARY KEY (`id` AUTOINCREMENT)
      );

      CREATE TABLE `class_students` (
        `id` INTEGER NOT NULL,
        `roll` INTEGER NOT NULL,
        `section` TEXT NOT NULL DEFAULT 'A',
        `section_roll` INTEGER NOT NULL,
        `year` INTEGER NOT NULL,
        `student_id` INTEGER NOT NULL,
        `class_id` INTEGER NOT NULL,
        PRIMARY KEY (`id` AUTOINCREMENT),
        CONSTRAINT `class_students_class_id` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
        CONSTRAINT `class_students_student_id` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`)
      );

      CREATE TABLE `class_subjects` (
        `id` INTEGER NOT NULL,
        `name` TEXT NOT NULL,
        `code` TEXT NOT NULL,
        `class_id` INTEGER NOT NULL,
        PRIMARY KEY (`id` AUTOINCREMENT),
        CONSTRAINT `class_subjects_class_id` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`)
      );

      CREATE TABLE `classes` (
        `id` INTEGER NOT NULL,
        `name` TEXT NOT NULL,
        PRIMARY KEY (`id` AUTOINCREMENT)
      );

      CREATE TABLE `exam_marks` (
        `id` INTEGER NOT NULL,
        `objective_mark` INTEGER NOT NULL DEFAULT '0',
        `subjective_mark` INTEGER NOT NULL DEFAULT '0',
        `practical_mark` INTEGER NOT NULL DEFAULT '0',
        `comment` TEXT NOT NULL DEFAULT 'GOOD',
        `subject_id` INTEGER NOT NULL DEFAULT '0',
        `student_id` INTEGER NOT NULL,
        `exam_id` INTEGER NOT NULL,
        PRIMARY KEY (`id` AUTOINCREMENT),
        CONSTRAINT `exam_marks_exam_id` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`),
        CONSTRAINT `exam_marks_student_id` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`),
        CONSTRAINT `exam_marks_subject_id` FOREIGN KEY (`subject_id`) REFERENCES `class_subjects` (`id`)
      );

      CREATE TABLE `exam_subjects` (
        `id` INTEGER NOT NULL,
        `objective_mark` INTEGER NOT NULL DEFAULT '0',
        `subjective_mark` INTEGER NOT NULL DEFAULT '0',
        `practical_mark` INTEGER NOT NULL DEFAULT '0',
        `subject_id` INTEGER NOT NULL,
        `exam_id` INTEGER NOT NULL,
        PRIMARY KEY (`id` AUTOINCREMENT),
        CONSTRAINT `exam_subjects_exam_id` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`),
        CONSTRAINT `exam_subjects_subject_id` FOREIGN KEY (`subject_id`) REFERENCES `class_subjects` (`id`)
      );

      CREATE TABLE `exams` (
        `id` INTEGER NOT NULL,
        `name` TEXT NOT NULL,
        `started` TEXT NOT NULL,
        `class_id` INTEGER NOT NULL,
        `school_id` INTEGER NOT NULL,
        PRIMARY KEY (`id` AUTOINCREMENT),
        CONSTRAINT `exams_class_id` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
        CONSTRAINT `exams_school_id` FOREIGN KEY (`school_id`) REFERENCES `schools` (`id`)
      );

      CREATE TABLE `parents` (
        `id` INTEGER NOT NULL,
        `name` TEXT NOT NULL,
        `img` TEXT DEFAULT NULL,
        `profession` TEXT DEFAULT NULL,
        `about_id` INTEGER NOT NULL,
        PRIMARY KEY (`id` AUTOINCREMENT),
        CONSTRAINT `parents_about_id` FOREIGN KEY (`about_id`) REFERENCES `abouts` (`id`)
      );

      CREATE TABLE `school_classes` (
        `id` INTEGER NOT NULL,
        `class_id` INTEGER NOT NULL,
        `school_id` INTEGER NOT NULL,
        PRIMARY KEY (`id` AUTOINCREMENT),
        CONSTRAINT `school_classes_class_id` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
        CONSTRAINT `school_classes_school_id` FOREIGN KEY (`school_id`) REFERENCES `schools` (`id`)
      );

      CREATE TABLE `school_students` (
        `id` INTEGER NOT NULL,
        `student_id` INTEGER NOT NULL,
        `school_id` INTEGER NOT NULL,
        PRIMARY KEY (`id` AUTOINCREMENT),
        CONSTRAINT `school_students_school_id` FOREIGN KEY (`school_id`) REFERENCES `schools` (`id`),
        CONSTRAINT `school_students_student_id` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`)
      );

      CREATE TABLE `school_teachers` (
        `id` INTEGER NOT NULL,
        `teacher_id` INTEGER NOT NULL,
        `school_id` INTEGER NOT NULL,
        PRIMARY KEY (`id` AUTOINCREMENT),
        CONSTRAINT `school_teacher_school_id` FOREIGN KEY (`school_id`) REFERENCES `schools` (`id`),
        CONSTRAINT `school_teachers_teacher_id` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`)
      );

      CREATE TABLE `schools` (
        `id` INTEGER NOT NULL,
        `name` TEXT NOT NULL,
        `img` TEXT DEFAULT NULL,
        `about_id` INTEGER NOT NULL,
        PRIMARY KEY (`id` AUTOINCREMENT),
        CONSTRAINT `schools_about_id` FOREIGN KEY (`about_id`) REFERENCES `abouts` (`id`)
      );

      CREATE TABLE `student_attendences` (
        `id` INTEGER NOT NULL,
        `present` INTEGER NOT NULL,
        `date` TEXT NOT NULL,
        `student_id` INTEGER NOT NULL,
        `class_id` INTEGER NOT NULL,
        PRIMARY KEY (`id` AUTOINCREMENT),
        CONSTRAINT `student_attendences_class_id` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
        CONSTRAINT `student_attendences_student_id` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`)
      );

      CREATE TABLE `student_parents` (
        `id` INTEGER NOT NULL,
        `parent_type` TEXT NOT NULL DEFAULT 'Father',
        `student_id` INTEGER NOT NULL,
        `parent_id` INTEGER NOT NULL,
        PRIMARY KEY (`id` AUTOINCREMENT),
        CONSTRAINT `student_parents_parent_id` FOREIGN KEY (`parent_id`) REFERENCES `parents` (`id`),
        CONSTRAINT `student_parents_student_id` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`)
      );

      CREATE TABLE `student_subjects` (
        `id` INTEGER NOT NULL,
        `main` INTEGER NOT NULL,
        `subject_id` INTEGER NOT NULL,
        `student_id` INTEGER NOT NULL,
        PRIMARY KEY (`id` AUTOINCREMENT),
        CONSTRAINT `student_subjects_student_id` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`),
        CONSTRAINT `student_subjects_subject_id` FOREIGN KEY (`subject_id`) REFERENCES `class_subjects` (`id`)
      );

      CREATE TABLE `students` (
        `id` INTEGER NOT NULL,
        `name` TEXT NOT NULL,
        `img` TEXT DEFAULT NULL,
        `about_id` INTEGER NOT NULL,
        PRIMARY KEY (`id` AUTOINCREMENT),
        CONSTRAINT `students_about_id` FOREIGN KEY (`about_id`) REFERENCES `abouts` (`id`)
      );

      CREATE TABLE `teachers` (
        `id` INTEGER NOT NULL,
        `name` TEXT NOT NULL,
        `img` TEXT DEFAULT NULL,
        `about_id` INTEGER NOT NULL,
        PRIMARY KEY (`id` AUTOINCREMENT),
        CONSTRAINT `teachers_about_id` FOREIGN KEY (`about_id`) REFERENCES `abouts` (`id`)
      );
      "#
  ).execute(connection).await.map_err(|_| Error::Create{ name: "create_tables".to_string() })?;

  Ok(())
}
