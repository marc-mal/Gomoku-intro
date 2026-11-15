<script setup>
import AppsSection from './components/AppsSection.vue';
import ArchitectureSection from './components/ArchitectureSection.vue';
import AllFeaturesSection from './components/AllFeaturesSection.vue';
import ContactSection from './components/ContactSection.vue';
import FeatureSection from './components/FeatureSection.vue';
import HeroSection from './components/HeroSection.vue';
import QuickStartSection from './components/QuickStartSection.vue';
import ShotGallery from './components/ShotGallery.vue';
import SiteFooter from './components/SiteFooter.vue';
import SiteNav from './components/SiteNav.vue';
import TelegramSection from './components/TelegramSection.vue';
</script>

<template>
  <SiteNav />
  <main>
    <HeroSection />
    <TelegramSection />
    <FeatureSection />
    <AllFeaturesSection />
    <AppsSection />
    <ShotGallery />
    <ArchitectureSection />
    <QuickStartSection />
    <ContactSection />
  </main>
  <SiteFooter />
</template>
