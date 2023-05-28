import dayjs from "dayjs";

export interface UserApplyType {
  isSend: boolean;
  id: string;
  firstName: string | "";
  lastName: string | "";
  secondName: string;
  age: number;
  gender: "man" | "woman";
  city: string;
  cityArea:
    | "CAO"
    | "SAO"
    | "SVAO"
    | "UVAO"
    | "UAO"
    | "UZAO"
    | "ZAO"
    | "SZAO"
    | "ZelAO"
    | "TiNAO";
  citizenship: "ru" | "notru";
  study: "SOO" | "NPO" | "SPO" | "NVO" | "VO";
  email: string;
  phone: string;
  studyName: string;
  studyCity: string;
  studyFac: string;
  studySpec: string;
  studyEnd: string;
  studyGrade: "mag" | "bak" | "spec";
  experience: [
    {
      experienceName: string;
      experienceDate: string | number | Date | dayjs.Dayjs | null | undefined;
      experienceText: string;
    }
  ];
  internDirection: string;
  internAbout: string;
  internSchedule: string;
  photo: ObjectWithFileList;
  vk: string;
  telegram: string;
  agreement: boolean;
}

interface FileObject {
  uid: string;
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  percent: number;
  originFileObj: {
    uid: string;
  };
  error?: {
    status: number;
    method: string;
    url: string;
  };
  response?: string;
  status?: string;
}

interface FileListObject extends FileObject {
  fileList: FileObject[];
}

interface ObjectWithFileList {
  file: FileObject;
  fileList: FileListObject[];
}
