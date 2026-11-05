from django.contrib import admin

from .models import ContactMessage, Profile, Project, Service


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("full_name", "title_uz", "years_experience")
    fieldsets = (
        ("Asosiy", {"fields": ("full_name", "years_experience", "skills", "photo")}),
        ("Unvon", {"fields": ("title_uz", "title_ru", "title_en")}),
        ("Bio", {"fields": ("bio_uz", "bio_ru", "bio_en")}),
        ("Aloqa", {"fields": ("email", "phone", "telegram", "github", "linkedin")}),
    )

    def has_add_permission(self, request):
        # Keep this a singleton — only one profile row makes sense.
        return not Profile.objects.exists()


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title_uz", "order", "is_published")
    list_editable = ("order", "is_published")
    list_filter = ("is_published",)
    fieldsets = (
        ("Nomi", {"fields": ("title_uz", "title_ru", "title_en")}),
        ("Qisqa tavsif", {"fields": ("summary_uz", "summary_ru", "summary_en")}),
        ("To'liq tavsif", {"fields": ("description_uz", "description_ru", "description_en")}),
        ("Qo'shimcha", {"fields": ("tech_stack", "image", "url", "order", "is_published")}),
    )


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title_uz", "price_label", "order", "is_highlighted", "is_published")
    list_editable = ("order", "is_highlighted", "is_published")
    fieldsets = (
        ("Nomi", {"fields": ("title_uz", "title_ru", "title_en")}),
        ("Tavsif", {"fields": ("description_uz", "description_ru", "description_en")}),
        ("Nimalar kiradi", {"fields": ("features_uz", "features_ru", "features_en")}),
        ("Narx va tartib", {"fields": ("price_label", "order", "is_highlighted", "is_published")}),
    )


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "contact_info", "created_at", "is_read")
    list_editable = ("is_read",)
    list_filter = ("is_read",)
    readonly_fields = ("name", "contact_info", "message", "created_at")
    ordering = ("-created_at",)
