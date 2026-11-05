from django.db import models


class Profile(models.Model):
    """Singleton-style model holding the 'about me' content. Only one row is expected."""

    full_name = models.CharField(max_length=150, default="")

    title_uz = models.CharField("Kasbiy unvon (UZ)", max_length=200, blank=True)
    title_ru = models.CharField("Kasbiy unvon (RU)", max_length=200, blank=True)
    title_en = models.CharField("Kasbiy unvon (EN)", max_length=200, blank=True)

    bio_uz = models.TextField("Bio (UZ)", blank=True)
    bio_ru = models.TextField("Bio (RU)", blank=True)
    bio_en = models.TextField("Bio (EN)", blank=True)

    years_experience = models.PositiveIntegerField(default=0)
    skills = models.CharField(
        max_length=500,
        blank=True,
        help_text="Vergul bilan ajrating, masalan: Django, React, React Native, Electron, Docker",
    )

    photo = models.ImageField(upload_to="profile/", blank=True, null=True)

    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=30, blank=True)
    telegram = models.CharField(max_length=100, blank=True, help_text="Masalan: @username")
    github = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)

    class Meta:
        verbose_name = "Profil (men haqimda)"
        verbose_name_plural = "Profil (men haqimda)"

    def __str__(self):
        return self.full_name or "Profil"

    def skills_list(self):
        return [s.strip() for s in self.skills.split(",") if s.strip()]


class Project(models.Model):
    title_uz = models.CharField("Nomi (UZ)", max_length=200)
    title_ru = models.CharField("Nomi (RU)", max_length=200, blank=True)
    title_en = models.CharField("Nomi (EN)", max_length=200, blank=True)

    summary_uz = models.CharField("Qisqa tavsif (UZ)", max_length=300, blank=True)
    summary_ru = models.CharField("Qisqa tavsif (RU)", max_length=300, blank=True)
    summary_en = models.CharField("Qisqa tavsif (EN)", max_length=300, blank=True)

    description_uz = models.TextField("To'liq tavsif (UZ)", blank=True)
    description_ru = models.TextField("To'liq tavsif (RU)", blank=True)
    description_en = models.TextField("To'liq tavsif (EN)", blank=True)

    tech_stack = models.CharField(
        max_length=300,
        blank=True,
        help_text="Vergul bilan ajrating, masalan: Django, React Native, PostgreSQL",
    )
    image = models.ImageField(upload_to="projects/", blank=True, null=True)
    url = models.URLField(blank=True, help_text="Loyihaning jonli sayti (agar bo'lsa)")
    order = models.PositiveIntegerField(default=0, help_text="Kichik raqam yuqorida chiqadi")
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "-id"]
        verbose_name = "Loyiha"
        verbose_name_plural = "Loyihalar"

    def __str__(self):
        return self.title_uz or self.title_en or f"Project #{self.pk}"

    def tech_list(self):
        return [t.strip() for t in self.tech_stack.split(",") if t.strip()]


class Service(models.Model):
    title_uz = models.CharField("Xizmat nomi (UZ)", max_length=150)
    title_ru = models.CharField("Xizmat nomi (RU)", max_length=150, blank=True)
    title_en = models.CharField("Xizmat nomi (EN)", max_length=150, blank=True)

    description_uz = models.TextField("Tavsif (UZ)", blank=True)
    description_ru = models.TextField("Tavsif (RU)", blank=True)
    description_en = models.TextField("Tavsif (EN)", blank=True)

    price_label = models.CharField(
        max_length=100,
        help_text="Masalan: '$300 dan boshlab' yoki 'Kelishilgan holda'",
    )
    features_uz = models.TextField(
        "Nimalar kiradi (UZ)", blank=True, help_text="Har bir qatorga bitta band yozing"
    )
    features_ru = models.TextField("Nimalar kiradi (RU)", blank=True)
    features_en = models.TextField("Nimalar kiradi (EN)", blank=True)

    order = models.PositiveIntegerField(default=0)
    is_highlighted = models.BooleanField(
        default=False, help_text="Ushbu xizmatni ajratib ko'rsatish (masalan eng ko'p tanlanadigan)"
    )
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "-id"]
        verbose_name = "Xizmat / Narx"
        verbose_name_plural = "Xizmatlar / Narxlar"

    def __str__(self):
        return self.title_uz or self.title_en or f"Service #{self.pk}"

    def features_list(self, lang="uz"):
        text = {"uz": self.features_uz, "ru": self.features_ru, "en": self.features_en}.get(
            lang, self.features_uz
        )
        return [line.strip() for line in text.splitlines() if line.strip()]


class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    contact_info = models.CharField(
        max_length=200, help_text="Email, telefon yoki Telegram username"
    )
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Kontakt xabari"
        verbose_name_plural = "Kontakt xabarlari"

    def __str__(self):
        return f"{self.name} — {self.created_at:%Y-%m-%d %H:%M}"
