// ==========================================
// Gemini AI Entegrasyonu
// ==========================================

const GEMINI_MODEL = 'gemini-3-flash-preview';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const SYSTEM_PROMPT = `Sen bir kişisel ajanda asistanısın. Kullanıcının haftalık ders programını ve antrenman takvimini yönetiyorsun.

KURALLAR:
1. Kullanıcı program değişikliği istediğinde, mevcut veriyi güncelle ve SADECE güncellenmiş JSON'u döndür.
2. Yanıtını MUTLAKA aşağıdaki JSON formatında ver. Başka hiçbir metin ekleme.
3. Eğer kullanıcı soru soruyor veya sohbet ediyorsa, "message" alanına yanıtını yaz ve "schedule" ile "fitnessPrograms" alanlarını null bırak.
4. Antrenman türleri: "fitness", "swimming", "running", "rest"
5. fitnessDay değeri sadece workout "fitness" olduğunda 1, 2 veya 3 olabilir. Diğer workout türlerinde null olmalı.
6. Her class objesinde "name" ve "time" alanları olmalı.

YANIT FORMATI (her zaman bu JSON formatında cevap ver):
{
  "message": "Kullanıcıya gösterilecek mesaj (değişiklik açıklaması veya sohbet yanıtı)",
  "schedule": [...] veya null,
  "fitnessPrograms": {...} veya null
}

Günlerin sırası: Pazartesi, Salı, Çarşamba, Perşembe, Cuma, Cumartesi, Pazar

Her gün objesinin yapısı:
{
  "day": "Pazartesi",
  "shortDay": "Pzt", 
  "workout": "fitness|swimming|running|rest",
  "fitnessDay": null veya 1-3,
  "classes": [{"name": "Ders Adı", "time": "09:00 - 11:00"}],
  "workoutTime": "17:00 - 18:30" veya null
}

Fitness program yapısı (anahtarlar "1", "2", "3"):
{
  "1": {
    "title": "Program başlığı",
    "subtitle": "1. Gün",
    "exercises": [{
      "name": "Egzersiz adı",
      "sets": 3,
      "reps": "10-12",
      "muscleGroup": "Kas grubu",
      "alternative": {"name": "Alternatif ad", "muscleGroup": "Kas grubu"}
    }]
  }
}`;

async function sendToGemini(userMessage, currentSchedule, currentFitnessPrograms) {
    const apiKey = getApiKey();
    if (!apiKey) {
        throw new Error('API key ayarlanmamış. Lütfen ayarlardan Gemini API anahtarınızı girin.');
    }

    const contextMessage = `MEVCUT HAFTALIK PROGRAM:
${JSON.stringify(currentSchedule, null, 2)}

MEVCUT FİTNESS PROGRAMLARI:
${JSON.stringify(currentFitnessPrograms, null, 2)}

KULLANICI İSTEĞİ: ${userMessage}`;

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            system_instruction: {
                parts: [{ text: SYSTEM_PROMPT }]
            },
            contents: [{
                parts: [{ text: contextMessage }]
            }],
            generationConfig: {
                temperature: 0.3,
                responseMimeType: 'application/json'
            }
        })
    });

    if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        const errMsg = errData?.error?.message || response.statusText;
        throw new Error(`Gemini API Hatası (${response.status}): ${errMsg}`);
    }

    const result = await response.json();
    const textContent = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textContent) {
        throw new Error('Gemini\'den yanıt alınamadı.');
    }

    try {
        const parsed = JSON.parse(textContent);
        return {
            message: parsed.message || 'İşlem tamamlandı.',
            schedule: parsed.schedule || null,
            fitnessPrograms: parsed.fitnessPrograms || null
        };
    } catch {
        throw new Error('Gemini yanıtı işlenemedi. Lütfen tekrar deneyin.');
    }
}
