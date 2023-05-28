export const changeApplyNames = (name: string) => {
  switch (name) {
    case "isSend":
      return "Завка отправлена";
    case "status":
      return "Статус";
    case "id":
      return "Id";
    case "firstName":
      return "Имя";
    case "lastName":
      return "Фамилия";
    case "secondName":
      return "Отчество";
    case "gender":
      return "Пол";
    case "age":
      return "Возраст";
    case "city":
      return "Город";
    case "cityArea":
      return "Район проживания";
    case "citizenship":
      return "Гражданство";
    case "study":
      return "Образование";
    case "email":
      return "Электронная почта";
    case "phone":
      return "Телефон";
    case "studyName":
      return "Учебное заведение";
    case "studyCity":
      return "Город";
    case "studyFac":
      return "Факультет";
    case "studySpec":
      return "Специальность";
    case "studyEnd":
      return "Дата окончания обучения";
    case "studyGrade":
      return "Уровень образования";
    case "internDirection":
      return "Направление стажировки";
    case "internAbout":
      return "Откуда узнал о стажировке";
    case "internSchedule":
      return "График работы";
    case "vk":
      return "Vk";
    case "telegram":
      return "Telegram";
    case "agreement":
      return "Соглашение подписано";
  }
};
