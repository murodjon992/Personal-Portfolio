import logging

import requests
from django.conf import settings

logger = logging.getLogger(__name__)


def notify_new_contact_message(contact_message):
    """Send a Telegram notification when a new contact message arrives.

    Silently does nothing if TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID are not set,
    so the contact form still works without Telegram configured.
    """
    token = settings.TELEGRAM_BOT_TOKEN
    chat_id = settings.TELEGRAM_CHAT_ID
    if not token or not chat_id:
        return

    text = (
        "📩 Yangi xabar portfolio saytdan\n\n"
        f"Ism: {contact_message.name}\n"
        f"Aloqa: {contact_message.contact_info}\n\n"
        f"Xabar:\n{contact_message.message}"
    )
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    try:
        requests.post(url, data={"chat_id": chat_id, "text": text}, timeout=5)
    except requests.RequestException:
        logger.exception("Failed to send Telegram notification for contact message %s", contact_message.pk)
