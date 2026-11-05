from rest_framework import serializers

from .models import ContactMessage, Profile, Project, Service

SUPPORTED_LANGS = ("uz", "ru", "en")


def _get_lang(context):
    request = context.get("request")
    lang = "uz"
    if request is not None:
        lang = request.query_params.get("lang", "uz")
    return lang if lang in SUPPORTED_LANGS else "uz"


class ProfileSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    bio = serializers.SerializerMethodField()
    skills = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            "full_name",
            "title",
            "bio",
            "years_experience",
            "skills",
            "photo",
            "email",
            "phone",
            "telegram",
            "github",
            "linkedin",
        ]

    def get_title(self, obj):
        lang = _get_lang(self.context)
        return getattr(obj, f"title_{lang}") or obj.title_uz

    def get_bio(self, obj):
        lang = _get_lang(self.context)
        return getattr(obj, f"bio_{lang}") or obj.bio_uz

    def get_skills(self, obj):
        return obj.skills_list()


class ProjectSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    summary = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    tech_stack = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "summary",
            "description",
            "tech_stack",
            "image",
            "url",
        ]

    def get_title(self, obj):
        lang = _get_lang(self.context)
        return getattr(obj, f"title_{lang}") or obj.title_uz

    def get_summary(self, obj):
        lang = _get_lang(self.context)
        return getattr(obj, f"summary_{lang}") or obj.summary_uz

    def get_description(self, obj):
        lang = _get_lang(self.context)
        return getattr(obj, f"description_{lang}") or obj.description_uz

    def get_tech_stack(self, obj):
        return obj.tech_list()


class ServiceSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    features = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = [
            "id",
            "title",
            "description",
            "price_label",
            "features",
            "is_highlighted",
        ]

    def get_title(self, obj):
        lang = _get_lang(self.context)
        return getattr(obj, f"title_{lang}") or obj.title_uz

    def get_description(self, obj):
        lang = _get_lang(self.context)
        return getattr(obj, f"description_{lang}") or obj.description_uz

    def get_features(self, obj):
        lang = _get_lang(self.context)
        return obj.features_list(lang)


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["id", "name", "contact_info", "message", "created_at"]
        read_only_fields = ["id", "created_at"]
