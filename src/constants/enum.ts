enum ROLES {
  ADMIN = "ADMIN",
  MENTOR = "MENTOR",
  STUDENT = "STUDENT",
}

enum GENDERS {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

enum ACHIEVEMENT_TYPES {
  EXPERIENCE = "EXPERIENCE",
  EDUCATION = "EDUCATION",
  CERTIFICATION = "CERTIFICATION",
}

enum EDUCATION_LEVELS {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
  HIGH_SCHOOL = "HIGH_SCHOOL",
  UNIVERSITY = "UNIVERSITY",
}

enum MENTOR_STATUS {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

enum MEETING_STATUS {
  SCHEDULED = "SCHEDULED",
  ONGOING = "ONGOING",
  FINISHED = "FINISHED",
  CANCELLED = "CANCELLED",
}

enum MEETING_TYPE {
  DEFAULT = "DEFAULT",
  AUDIOROOM = "AUDIOROOM",
  LIVESTREAMING = "LIVESTREAMING",
}

enum PARTICIPANT_ROLE {
  ADMIN = "ADMIN",
  USER = "USER",
}

export {
  ROLES,
  GENDERS,
  ACHIEVEMENT_TYPES,
  EDUCATION_LEVELS,
  MENTOR_STATUS,
  MEETING_STATUS,
  MEETING_TYPE,
  PARTICIPANT_ROLE,
};
