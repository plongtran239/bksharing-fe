enum ACCOUNT_STATUS {
  ACTIVE = "ACTIVE",
  DEACTIVE = "DEACTIVE",
}

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
  EDUCATION = "EDUCATION",
  EXPERIENCE = "EXPERIENCE",
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

enum RESOURCE_TYPE {
  IMAGE = "IMAGE",
  RAW = "RAW",
  VIDEO = "VIDEO",
}

enum FOLDER {
  IMAGES = "IMAGES",
  VIDEOS = "VIDEOS",
  FILES = "FILES",
}

enum TARGET_AUDIENCE {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  EXPERT = "EXPERT",
}

enum COURSE_STATUS {
  DRAFT = "DRAFT",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  STOPPED = "STOPPED",
  ARCHIVED = "ARCHIVED",
}

enum SUBSCRIPTION_STATUS {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  ACTIVE = "ACTIVE",
  CANCELED = "CANCELED",
  ENDED = "ENDED",
  EXPIRED = "EXPIRED",
  REJECTED = "REJECTED",
}

enum PAYMENT_STATUS {
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE", // Authorization Succeeded
  CANCELED = "CANCELED", // Cancel a payment
  EXPIRED = "EXPIRED", // Payment expired
}

enum DAY_OF_WEEK {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

enum NOTIFICATION_TYPE {
  COURSE_CREATED = "COURSE_CREATED",
  COURSE_UPDATED = "COURSE_UPDATED",
  COURSE_DELETED = "COURSE_DELETED",
  COURSE_APPROVED = "COURSE_APPROVED",
  COURSE_REJECTED = "COURSE_REJECTED",
  SUBSCRIPTION_CREATED = "SUBSCRIPTION_CREATED",
  SUBSCRIPTION_APPROVED = "SUBSCRIPTION_APPROVED",
  SUBSCRIPTION_REJECTED = "SUBSCRIPTION_REJECTED",
  SUBSCRIPTION_EXPIRED = "SUBSCRIPTION_EXPIRED",
  AUDIO_CALL_CREATED = "AUDIO_CALL_CREATED",
  MENTOR_REGISTERD = "MENTOR_REGISTERD",
  MENTOR_APPROVED = "MENTOR_APPROVED",
  MENTOR_REJECTED = "MENTOR_REJECTED",
  PAYMENT_SUCCESS = "PAYMENT_SUCCESS",
  PAYMENT_FAILED = "PAYMENT_FAILED",
  ADMIN_APPROVAL = "ADMIN_APPROVAL",
  GENERAL_NOTIFICATION = "GENERAL_NOTIFICATION",
}

enum NOTIFICATION_RELATION_TYPE {
  COURSE = "COURSE",
  SUBSCRIPTION = "SUBSCRIPTION",
  PAYMENT = "PAYMENT",
  MENTOR = "MENTOR",
  AUDIO_CALL = "AUDIO_CALL",
  ADMIN = "ADMIN",
}

enum REVIEW_TYPE {
  COURSE = "COURSE",
  MENTOR = "MENTOR",
}

enum ERROR_ACTION {
  SUBSCRIPTION_FOR_THIS_COURSE_STILL_ACTIVE = "SUBSCRIPTION_FOR_THIS_COURSE_STILL_ACTIVE",
  SUBSCRIPTION_ACTIVE_OVERLAP_SCHEDULE = "SUBSCRIPTION_ACTIVE_OVERLAP_SCHEDULE",
}

enum DATE_RANGE {
  ALL = "ALL",
  TODAY = "TODAY",
  ONE_WEEK = "1_WEEK",
  ONE_MONTH = "1_MONTH",
  THREE_MONTHS = "3_MONTHS",
  SIX_MONTHS = "6_MONTHS",
  ONE_YEAR = "1_YEAR",
}

enum REPORT_TYPE {
  COURSE_UNQUALIFIED = "COURSE_UNQUALIFIED",
  MENTOR_ISSUES = "MENTOR_ISSUES",
  FEEDBACK_INAPPROPRIATE = "FEEDBACK_INAPPROPRIATE",
}

enum REPORT_STATUS {
  PENDING = "PENDING",
  RESOLVED = "RESOLVED",
  REJECTED = "REJECTED",
}

enum WAGE_STATUS {
  FULL_WAGE = "FULL_WAGE",
}

export {
  ACCOUNT_STATUS,
  ROLES,
  GENDERS,
  ACHIEVEMENT_TYPES,
  EDUCATION_LEVELS,
  MENTOR_STATUS,
  MEETING_STATUS,
  MEETING_TYPE,
  PARTICIPANT_ROLE,
  RESOURCE_TYPE,
  FOLDER,
  TARGET_AUDIENCE,
  COURSE_STATUS,
  SUBSCRIPTION_STATUS,
  PAYMENT_STATUS,
  DAY_OF_WEEK,
  NOTIFICATION_TYPE,
  NOTIFICATION_RELATION_TYPE,
  REVIEW_TYPE,
  ERROR_ACTION,
  DATE_RANGE,
  REPORT_TYPE,
  REPORT_STATUS,
  WAGE_STATUS,
};
