from django.views.generic import TemplateView

class ReactHomeView(TemplateView):
    template_name = "frontend/index.html"