import Dexie from 'dexie';

export const db = new Dexie('StudentSurveyDB');

db.version(1).stores({
  surveys: '++id, surveyId, surveyTitle, submittedAt',
  settings: 'key'
});

export const saveSurvey = async (surveyData) => {
  return await db.surveys.add({
    surveyId: surveyData.surveyId || crypto.randomUUID(),
    surveyTitle: surveyData.surveyTitle,
    submittedAt: new Date().toISOString(),
    answers: surveyData.answers
  });
};

export const getAllSurveys = async () => {
  return await db.surveys.orderBy('submittedAt').reverse().toArray();
};

export const getSurveysByTitle = async (title) => {
  return await db.surveys.where('surveyTitle').equals(title).reverse().toArray();
};

export const deleteSurvey = async (id) => {
  return await db.surveys.delete(id);
};

export const getSetting = async (key) => {
  const setting = await db.settings.get(key);
  return setting ? setting.value : null;
};

export const setSetting = async (key, value) => {
  return await db.settings.put({ key, value });
};

