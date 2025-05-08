const BASE_URL = 'http://213.219.214.83:8080';

function objectToFormData(obj) {
    const formData = new FormData();
    Object.keys(obj).forEach((key) => {
        formData.append(key, obj[key]);
    });
    return formData;
}

async function sendRequest(url, method, data = null, isMultipart = false) {
    try {
        const options = {
            method,
            mode: 'cors',
            credentials: 'include',
        };

        // Проверяем, нужен ли multipart
        const isActuallyMultipart = isMultipart || (data instanceof FormData);

        if (data) {
            if (isActuallyMultipart) {
                // Для FormData заголовок Content-Type не ставим — браузер сам сделает
                options.body = (data instanceof FormData) ? data : objectToFormData(data);
            } else {
                options.headers = {
                    'Content-Type': 'application/json',
                };
                options.body = JSON.stringify(data);
            }
        }

        const response = await fetch(url, options);

        if (response.ok) {
            const responseData = await response.json();
            return { success: true, data: responseData };
        }

        const errorText = await response.text();
        return { success: false, message: errorText };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : String(error),
        };
    }
}

async function sendFeedback(score, answer) {
    const url = `${BASE_URL}/queries/sendResp`;
    return sendRequest(url, 'POST', { name: 'CSAT', score, answer });
}

document.addEventListener('DOMContentLoaded', () => {
    const nextBtn = document.querySelector('.nextFeedback');
    const ground = document.querySelector('.groundFeedback');
    const stars = document.querySelector('.starsFeedback');
    const hideButtons = document.querySelectorAll('.HideBtn');
    const sendBtn = document.querySelector('.sendFeedback');

    if (!nextBtn || !ground || !stars || !sendBtn) {
        return;
    }

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const ratingSelected = document.querySelector('input[name="rating"]:checked');
        if (!ratingSelected) {
            alert('Пожалуйста, выберите оценку');
            return;
        }

        ground.style.display = 'block';
        stars.style.display = 'none';
    });

    hideButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            document.querySelector('.feedback').style.display = 'none';
        });
    });

    sendBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const ratingSelected = document.querySelector('input[name="rating"]:checked');
        const reviewText = document.querySelector('.groundFeedback textarea').value.trim();

        if (!ratingSelected) {
            console.error('Оценка не выбрана');
            return;
        }

        const score = ratingSelected.value;
        const answer = reviewText;

        console.log('Количество звезд:', Number(score));
        console.log('Текст отзыва:', answer);

        try {
            await sendFeedback(Number(score), answer);
            console.log('Отзыв успешно отправлен');
            document.querySelector('.feedback').style.display = 'none';
        } catch (error) {
            console.error('Ошибка отправки отзыва:', error);
            alert('Ошибка при отправке. Попробуйте еще раз.');
        }
    });
});
