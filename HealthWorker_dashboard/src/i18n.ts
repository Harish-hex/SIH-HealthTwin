import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  EN: {
    translation: {
      appName: 'Digital Health Twin',
      appTagline: 'Government Health Monitoring Dashboard',
      language: 'Language',
      map: {
        title: 'Regional Health Overview',
        subtitle: 'Real-time monitoring and health status across all 8 Northeast Indian states',
        coverage: 'Northeast India Coverage',
        legend: { good: 'Good', moderate: 'Moderate', risk: 'Risk' },
        stats: {
          statesGood: 'States - Good',
          statesModerate: 'States - Moderate',
          stateRisk: 'State - Risk',
          totalCoverage: 'Total Coverage'
        },
        stateDetails: 'State Details',
        labels: { population: 'Population', coverage: 'Coverage', activeAlerts: 'Active Alerts' }
      },
      impact: {
        title: 'Real Impact, Real Numbers',
        subtitle: 'Measurable progress in community health protection across Northeast India',
        metrics: {
          statesCoverage: 'States Coverage Area',
          statesCoverageDesc: 'Complete coverage across Northeast India',
          reportsSubmitted: 'Reports Submitted',
          reportsSubmittedDesc: 'Health reports from field workers',
          waterTests: 'Water Tests Analyzed',
          waterTestsDesc: 'Laboratory-quality water analysis',
          ashaWorkers: 'ASHA Workers Onboarded',
          ashaWorkersDesc: 'Trained community health workers',
          healthCenters: 'Health Centers Connected',
          healthCentersDesc: 'Primary health centers integrated',
          livesProtected: 'Lives Protected',
          livesProtectedDesc: 'People under active monitoring'
        },
        success: {
          title: 'Prevention Success Story',
          body: 'In August 2024, our AI system detected early indicators of a potential cholera outbreak in remote villages of Meghalaya. The 72-hour early warning allowed health workers to implement preventive measures, potentially saving thousands of lives and preventing widespread illness.',
          metrics: { preventionRate: 'Outbreak Prevention Rate', earlyWarning: 'Average Early Warning' }
        },
        systemStatus: {
          title: 'Current System Status',
          uptime: 'System Uptime',
          activeMonitors: 'Active Monitors',
          alertsThisWeek: 'Alerts This Week',
          falsePositiveRate: 'False Positive Rate'
        }
      },
      healthTwin: {
        title: 'Digital Health Twin: AI Prediction',
        subtitle: 'Input water quality parameters and population data to predict potential disease outbreaks.',
        phLabel: 'pH Level (0-14)',
        turbidityLabel: 'Turbidity (NTU)',
        tdsLabel: 'Total Dissolved Solids (TDS) (mg/L)',
        peopleAffectedLabel: 'People Affected (per 5000)',
        stateLabel: 'State',
        districtLabel: 'District',
        locationLabel: 'Specific Location (Village/Area)',
        collectedByLabel: 'Collected By (Worker ID/Name)',
        predictButton: 'Predict Disease',
        predicting: 'Predicting...',
        predictionResult: 'Prediction Result',
        predictedDisease: 'Predicted Disease',
        healthAlert: 'Health Alert',
        recordSaved: 'Record saved to database with ID',
        safeRanges: {
          ph: 'Safe range: 6.5 - 8.5',
          turbidity: 'Safe range: < 5 NTU',
          tds: 'Safe range: < 500 mg/L',
          peopleAffected: 'Number of people showing symptoms in a 5000 population sample.'
        }
      },
      analytics: {
        title: 'Comprehensive Health Analytics',
        subtitle: 'Detailed insights from collected water quality data and disease predictions.',
        loading: 'Loading analytics data...',
        error: 'Error',
        retry: 'Retry',
        tabs: {
          overview: 'Overview',
          records: 'Records',
          alerts: 'Alerts',
          workers: 'Workers'
        },
        overview: {
          totalRecords: 'Total Records',
          activeAlerts: 'Active Alerts',
          totalWorkers: 'Total Health Workers',
          diseaseBreakdown: 'Disease Breakdown',
          stateBreakdown: 'State Breakdown'
        },
        records: {
          title: 'Recent Health Records',
          noRecords: 'No records available.',
          columns: {
            id: 'ID',
            time: 'Time',
            location: 'Location',
            disease: 'Disease',
            alert: 'Alert',
            ph: 'pH',
            turbidity: 'Turbidity',
            tds: 'TDS'
          }
        },
        alerts: {
          title: 'Active Health Alerts',
          noAlerts: 'No active alerts.',
          columns: {
            id: 'ID',
            createdAt: 'Created At',
            location: 'Location',
            disease: 'Disease',
            level: 'Level',
            status: 'Status'
          }
        },
        workers: {
          title: 'Health Workers Management',
          noWorkers: 'No health workers available.',
          columns: {
            id: 'ID',
            name: 'Name',
            workerId: 'Worker ID',
            role: 'Role',
            state: 'State',
            district: 'District',
            contact: 'Contact',
            active: 'Active'
          }
        }
      }
    }
  },
  AS: {
    translation: {
      appName: 'হেল্থৱাচ এনই',
      appTagline: 'চৰকাৰী স্বাস্থ্য নিৰীক্ষণ ডেশবৰ্ড',
      language: 'ভাষা',
      map: {
        title: 'আঞ্চলিক স্বাস্থ্য সমীক্ষা',
        subtitle: 'উত্তৰ-পূৰ্ব ভাৰতৰ ৮খন ৰাজ্যৰ বাস্তৱ সময়ৰ স্বাস্থ্য নিৰীক্ষণ',
        coverage: 'উত্তৰ-পূৰ্ব ভাৰতৰ কভাৰেজ',
        legend: { good: 'ভাল', moderate: 'মধ্যম', risk: 'বিপদজনক' },
        stats: {
          statesGood: 'ৰাজ্য - ভাল',
          statesModerate: 'ৰাজ্য - মধ্যম',
          stateRisk: 'ৰাজ্য - বিপদ',
          totalCoverage: 'মুঠ কভাৰেজ'
        },
        stateDetails: 'ৰাজ্যৰ বিৱৰণ',
        labels: { population: 'জনসংখ্যা', coverage: 'কভাৰেজ', activeAlerts: 'সক্ৰিয় সতৰ্কতা' }
      },
      impact: {
        title: 'বাস্তৱ প্ৰভাৱ, বাস্তৱ সংখ্যা',
        subtitle: 'উত্তৰ-পূৰ্ব ভাৰতত সমাজৰ স্বাস্থ্য সুৰক্ষাৰ পৰিমাপযোগ্য অগ্ৰগতি',
        metrics: {
          statesCoverage: 'ৰাজ্য কভাৰেজ এলেকা',
          statesCoverageDesc: 'উত্তৰ-পূৰ্ব ভাৰত জুৰি সম্পূৰ্ণ কভাৰেজ',
          reportsSubmitted: 'দাখিল কৰা প্ৰতিবেদন',
          reportsSubmittedDesc: 'ক্ষেত্ৰৰ কৰ্মীৰ পৰা স্বাস্থ্য প্ৰতিবেদন',
          waterTests: 'পানী পৰীক্ষা বিশ্লেষণ',
          waterTestsDesc: 'পৰীক্ষাগাৰৰ মানৰ পানী বিশ্লেষণ',
          ashaWorkers: 'আশা কৰ্মী যোগদান',
          ashaWorkersDesc: 'প্ৰশিক্ষিত সম্প্ৰদায়িক স্বাস্থ্য কৰ্মী',
          healthCenters: 'স্বাস্থ্য কেন্দ্ৰ সংযোগ',
          healthCentersDesc: 'প্ৰাথমিক স্বাস্থ্য কেন্দ্ৰ সংহত',
          livesProtected: 'সংৰক্ষিত জীৱন',
          livesProtectedDesc: 'সক্ৰিয় নিৰীক্ষণৰ অধীনত থকা লোক'
        },
        success: {
          title: 'প্ৰতিৰোধৰ সফলতাৰ কাহিনী',
          body: '২০২৪ চনৰ আগষ্টত আমাৰ AI ব্যৱস্থাই মেঘালয়ৰ দূৰৱৰ্তী গাওঁত সম্ভাব্য কলেৰা প্ৰাদুৰ্ভাৱৰ প্ৰাৰম্ভিক সূচক চিনাক্ত কৰিছিল।',
          metrics: { preventionRate: 'প্ৰাদুৰ্ভাৱ প্ৰতিৰোধৰ হাৰ', earlyWarning: 'গড় আগতীয়া সতৰ্কতা' }
        },
        systemStatus: {
          title: 'বৰ্তমানৰ ব্যৱস্থাৰ অৱস্থা',
          uptime: 'ব্যৱস্থা আপটাইম',
          activeMonitors: 'সক্ৰিয় মনিটৰ',
          alertsThisWeek: 'এই সপ্তাহৰ সতৰ্কতা',
          falsePositiveRate: 'ভুল ধনাত্মক হাৰ'
        }
      },
      healthTwin: {
        title: 'ডিজিটেল স্বাস্থ্য যমজ: AI ভৱিষ্যদ্বাণী',
        subtitle: 'সম্ভাব্য ৰোগৰ প্ৰাদুৰ্ভাৱৰ ভৱিষ্যদ্বাণী কৰিবলৈ পানীৰ গুণগত পৰিমাপ আৰু জনসংখ্যাৰ তথ্য ইনপুট কৰক।',
        phLabel: 'pH স্তৰ (0-14)',
        turbidityLabel: 'টাৰ্বিডিটি (NTU)',
        tdsLabel: 'মুঠ দ্ৰৱীভূত কঠিন পদাৰ্থ (TDS) (mg/L)',
        peopleAffectedLabel: 'প্ৰভাৱিত লোক (৫০০০ জনৰ ভিতৰত)',
        stateLabel: 'ৰাজ্য',
        districtLabel: 'জিলা',
        locationLabel: 'নিৰ্দিষ্ট স্থান (গাওঁ/এলেকা)',
        collectedByLabel: 'সংগ্ৰহকাৰী (কৰ্মী আইডি/নাম)',
        predictButton: 'ৰোগৰ ভৱিষ্যদ্বাণী কৰক',
        predicting: 'ভৱিষ্যদ্বাণী কৰি আছে...',
        predictionResult: 'ভৱিষ্যদ্বাণীৰ ফলাফল',
        predictedDisease: 'ভৱিষ্যদ্বাণী কৰা ৰোগ',
        healthAlert: 'স্বাস্থ্য সতৰ্কতা',
        recordSaved: 'ৰেকৰ্ড ডাটাবেছত সংৰক্ষণ কৰা হৈছে আইডি সহ',
        safeRanges: {
          ph: 'নিৰাপদ পৰিসৰ: 6.5 - 8.5',
          turbidity: 'নিৰাপদ পৰিসৰ: < 5 NTU',
          tds: 'নিৰাপদ পৰিসৰ: < 500 mg/L',
          peopleAffected: '৫০০০ জনসংখ্যাৰ নমুনাত লক্ষণ দেখুওৱা লোকৰ সংখ্যা।'
        }
      },
      analytics: {
        title: 'ব্যাপক স্বাস্থ্য বিশ্লেষণ',
        subtitle: 'সংগৃহীত পানীৰ গুণগত তথ্য আৰু ৰোগৰ ভৱিষ্যদ্বাণীৰ পৰা বিশদ অন্তৰ্দৃষ্টি।',
        loading: 'বিশ্লেষণৰ তথ্য লোড কৰি আছে...',
        error: 'ত্ৰুটি',
        retry: 'পুনৰ চেষ্টা কৰক',
        tabs: {
          overview: 'সংক্ষিপ্ত বিৱৰণ',
          records: 'ৰেকৰ্ডসমূহ',
          alerts: 'সতৰ্কতাসমূহ',
          workers: 'কৰ্মীসকল'
        },
        overview: {
          totalRecords: 'মুঠ ৰেকৰ্ড',
          activeAlerts: 'সক্ৰিয় সতৰ্কতা',
          totalWorkers: 'মুঠ স্বাস্থ্য কৰ্মী',
          diseaseBreakdown: 'ৰোগৰ বিভাগ',
          stateBreakdown: 'ৰাজ্যৰ বিভাগ'
        },
        records: {
          title: 'শেহতীয়া স্বাস্থ্য ৰেকৰ্ডসমূহ',
          noRecords: 'কোনো ৰেকৰ্ড উপলব্ধ নাই।',
          columns: {
            id: 'আইডি',
            time: 'সময়',
            location: 'স্থান',
            disease: 'ৰোগ',
            alert: 'সতৰ্কতা',
            ph: 'pH',
            turbidity: 'টাৰ্বিডিটি',
            tds: 'TDS'
          }
        },
        alerts: {
          title: 'সক্ৰিয় স্বাস্থ্য সতৰ্কতাসমূহ',
          noAlerts: 'কোনো সক্ৰিয় সতৰ্কতা নাই।',
          columns: {
            id: 'আইডি',
            createdAt: 'সৃষ্টি হোৱা সময়',
            location: 'স্থান',
            disease: 'ৰোগ',
            level: 'স্তৰ',
            status: 'অৱস্থা'
          }
        },
        workers: {
          title: 'স্বাস্থ্য কৰ্মী ব্যৱস্থাপনা',
          noWorkers: 'কোনো স্বাস্থ্য কৰ্মী উপলব্ধ নাই।',
          columns: {
            id: 'আইডি',
            name: 'নাম',
            workerId: 'কৰ্মী আইডি',
            role: 'ভূমিকা',
            state: 'ৰাজ্য',
            district: 'জিলা',
            contact: 'যোগাযোগ',
            active: 'সক্ৰিয়'
          }
        }
      }
    }
  },
  BN: {
    translation: {
      appName: 'হেলথওয়াচ এনই',
      appTagline: 'সরকারি স্বাস্থ্য মনিটরিং ড্যাশবোর্ড',
      language: 'ভাষা',
      map: {
        title: 'আঞ্চলিক স্বাস্থ্য সমীক্ষা',
        subtitle: 'উত্তর-পূর্ব ভারতের ৮টি রাজ্যের বাস্তব-সময়ের স্বাস্থ্য পর্যবেক্ষণ',
        coverage: 'উত্তর-পূর্ব ভারতের কভারেজ',
        legend: { good: 'ভাল', moderate: 'মধ্যম', risk: 'ঝুঁকিপূর্ণ' },
        stats: {
          statesGood: 'রাজ্য - ভাল',
          statesModerate: 'রাজ্য - মধ্যম',
          stateRisk: 'রাজ্য - ঝুঁকি',
          totalCoverage: 'মোট কভারেজ'
        },
        stateDetails: 'রাজ্যের বিস্তারিত',
        labels: { population: 'জনসংখ্যা', coverage: 'কভারেজ', activeAlerts: 'সক্রিয় সতর্কতা' }
      },
      impact: {
        title: 'বাস্তব প্রভাব, বাস্তব সংখ্যা',
        subtitle: 'উত্তর-পূর্ব ভারতে কমিউনিটি স্বাস্থ্য সুরক্ষায় পরিমাপযোগ্য অগ্রগতি',
        metrics: {
          statesCoverage: 'রাজ্য কভারেজ এলাকা',
          statesCoverageDesc: 'উত্তর-পূর্ব ভারতে সম্পূর্ণ কভারেজ',
          reportsSubmitted: 'জমা দেওয়া রিপোর্ট',
          reportsSubmittedDesc: 'ক্ষেত্রকর্মীদের স্বাস্থ্য রিপোর্ট',
          waterTests: 'জল পরীক্ষা বিশ্লেষণ',
          waterTestsDesc: 'ল্যাবরেটরি-মানের জল বিশ্লেষণ',
          ashaWorkers: 'আশা কর্মী সংযুক্ত',
          ashaWorkersDesc: 'প্রশিক্ষিত স্বাস্থ্যকর্মী',
          healthCenters: 'স্বাস্থ্য কেন্দ্র সংযুক্ত',
          healthCentersDesc: 'প্রাথমিক স্বাস্থ্য কেন্দ্র একীভূত',
          livesProtected: 'রক্ষা প্রাপ্ত জীবন',
          livesProtectedDesc: 'সক্রিয় পর্যবেক্ষণে থাকা মানুষ'
        },
        success: {
          title: 'প্রতিরোধের সাফল্যের গল্প',
          body: 'আগস্ট ২০২ৄ-এ, মেঘালয়ের দূরবর্তী গ্রামগুলোতে সম্ভাব্য কলেরার প্রাথমিক ইঙ্গিত আমাদের AI সিস্টেম শনাক্ত করে।',
          metrics: { preventionRate: 'আউটব্রেক প্রতিরোধের হার', earlyWarning: 'গড় আগাম সতর্কতা' }
        },
        systemStatus: {
          title: 'বর্তমান সিস্টেমের অবস্থা',
          uptime: 'সিস্টেম আপটাইম',
          activeMonitors: 'সক্রিয় মনিটর',
          alertsThisWeek: 'এই সপ্তাহের সতর্কতা',
          falsePositiveRate: 'ভুল ধনাত্মক হার'
        }
      },
      healthTwin: {
        title: 'ডিজিটাল হেলথ টুইন: এআই পূর্বাভাস',
        subtitle: 'সম্ভাব্য রোগের প্রাদুর্ভাবের পূর্বাভাস দিতে জলের গুণগত মান এবং জনসংখ্যার ডেটা ইনপুট করুন।',
        phLabel: 'pH স্তর (০-১৪)',
        turbidityLabel: 'টার্বিডিটি (NTU)',
        tdsLabel: 'মোট দ্রবীভূত কঠিন পদার্থ (TDS) (mg/L)',
        peopleAffectedLabel: 'আক্রান্ত মানুষ (৫০০০ জনের মধ্যে)',
        stateLabel: 'রাজ্য',
        districtLabel: 'জেলা',
        locationLabel: 'নির্দিষ্ট স্থান (গ্রাম/এলাকা)',
        collectedByLabel: 'সংগ্রহকারী (কর্মী আইডি/নাম)',
        predictButton: 'রোগের পূর্বাভাস দিন',
        predicting: 'পূর্বাভাস দিচ্ছে...',
        predictionResult: 'পূর্বাভাসের ফলাফল',
        predictedDisease: 'পূর্বাভাসিত রোগ',
        healthAlert: 'স্বাস্থ্য সতর্কতা',
        recordSaved: 'রেকর্ড ডেটাবেসে সংরক্ষণ করা হয়েছে আইডি সহ',
        safeRanges: {
          ph: 'নিরাপদ পরিসর: ৬.৫ - ৮.৫',
          turbidity: 'নিরাপদ পরিসর: < ৫ NTU',
          tds: 'নিরাপদ পরিসর: < ৫০০ mg/L',
          peopleAffected: '৫০০০ জনসংখ্যার নমুনায় লক্ষণ দেখানো মানুষের সংখ্যা।'
        }
      },
      analytics: {
        title: 'বিস্তৃত স্বাস্থ্য বিশ্লেষণ',
        subtitle: 'সংগৃহীত জলের গুণগত মানের ডেটা এবং রোগের পূর্বাভাস থেকে বিস্তারিত অন্তর্দৃষ্টি।',
        loading: 'বিশ্লেষণের ডেটা লোড করা হচ্ছে...',
        error: 'ত্রুটি',
        retry: 'পুনরায় চেষ্টা করুন',
        tabs: {
          overview: 'সংক্ষিপ্ত বিবরণ',
          records: 'রেকর্ডস',
          alerts: 'সতর্কতা',
          workers: 'কর্মী'
        },
        overview: {
          totalRecords: 'মোট রেকর্ড',
          activeAlerts: 'সক্রিয় সতর্কতা',
          totalWorkers: 'মোট স্বাস্থ্য কর্মী',
          diseaseBreakdown: 'রোগের বিভাগ',
          stateBreakdown: 'রাজ্য বিভাগ'
        },
        records: {
          title: 'সাম্প্রতিক স্বাস্থ্য রেকর্ডস',
          noRecords: 'কোনো রেকর্ড পাওয়া যায়নি।',
          columns: {
            id: 'আইডি',
            time: 'সময়',
            location: 'অবস্থান',
            disease: 'রোগ',
            alert: 'সতর্কতা',
            ph: 'pH',
            turbidity: 'টার্বিডিটি',
            tds: 'TDS'
          }
        },
        alerts: {
          title: 'সক্রিয় স্বাস্থ্য সতর্কতা',
          noAlerts: 'কোনো সক্রিয় সতর্কতা নেই।',
          columns: {
            id: 'আইডি',
            createdAt: 'তৈরি হওয়ার সময়',
            location: 'অবস্থান',
            disease: 'রোগ',
            level: 'স্তর',
            status: 'অবস্থা'
          }
        },
        workers: {
          title: 'স্বাস্থ্য কর্মী ব্যবস্থাপনা',
          noWorkers: 'কোনো স্বাস্থ্য কর্মী পাওয়া যায়নি।',
          columns: {
            id: 'আইডি',
            name: 'নাম',
            workerId: 'কর্মী আইডি',
            role: 'ভূমিকা',
            state: 'রাজ্য',
            district: 'জেলা',
            contact: 'যোগাযোগ',
            active: 'সক্রিয়'
          }
        }
      }
    }
  },
  HI: {
    translation: {
      appName: 'हेल्थवॉच NE',
      appTagline: 'सरकारी स्वास्थ्य निगरानी डैशबोर्ड',
      language: 'भाषा',
      map: {
        title: 'क्षेत्रीय स्वास्थ्य सर्वेक्षण',
        subtitle: 'पूर्वोत्तर भारत के सभी 8 राज्यों में वास्तविक समय में स्वास्थ्य निगरानी',
        coverage: 'पूर्वोत्तर भारत कवरेज',
        legend: { good: 'अच्छा', moderate: 'मध्यम', risk: 'जोखिम' },
        stats: {
          statesGood: 'राज्य - अच्छा',
          statesModerate: 'राज्य - मध्यम',
          stateRisk: 'राज्य - जोखिम',
          totalCoverage: 'कुल कवरेज'
        },
        stateDetails: 'राज्य विवरण',
        labels: { population: 'जनसंख्या', coverage: 'कवरेज', activeAlerts: 'सक्रिय चेतावनियाँ' }
      },
      impact: {
        title: 'वास्तविक प्रभाव, वास्तविक संख्या',
        subtitle: 'पूर्वोत्तर भारत में समुदाय स्वास्थ्य सुरक्षा में मापनीय प्रगति',
        metrics: {
          statesCoverage: 'राज्य कवरेज क्षेत्र',
          statesCoverageDesc: 'पूर्वोत्तर भारत में पूर्ण कवरेज',
          reportsSubmitted: 'जमा की गई रिपोर्टें',
          reportsSubmittedDesc: 'मैदानी कार्यकर्ताओं से स्वास्थ्य रिपोर्ट',
          waterTests: 'जल परीक्षण विश्लेषित',
          waterTestsDesc: 'प्रयोगशाला-स्तरीय जल विश्लेषण',
          ashaWorkers: 'आशा कार्यकर्ता जुड़े',
          ashaWorkersDesc: 'प्रशिक्षित सामुदायिक स्वास्थ्य कार्यकर्ता',
          healthCenters: 'स्वास्थ्य केंद्र जुड़े',
          healthCentersDesc: 'प्राथमिक स्वास्थ्य केंद्र एकीकृत',
          livesProtected: 'जीवन सुरक्षित',
          livesProtectedDesc: 'सक्रिय निगरानी के अंतर्गत लोग'
        },
        success: {
          title: 'रोकथाम की सफलता की कहानी',
          body: 'अगस्त 2024 में, हमारे AI सिस्टम ने मेघालय के दूरस्थ गाँवों में संभावित कॉलरा प्रकोप के प्रारंभिक संकेत पहचाने।',
          metrics: { preventionRate: 'प्रकोप रोकथाम दर', earlyWarning: 'औसत पूर्व चेतावनी' }
        },
        systemStatus: {
          title: 'वर्तमान सिस्टम स्थिति',
          uptime: 'सिस्टम अपटाइम',
          activeMonitors: 'सक्रिय मॉनिटर',
          alertsThisWeek: 'इस सप्ताह की चेतावनियाँ',
          falsePositiveRate: 'गलत धनात्मक दर'
        }
      },
      healthTwin: {
        title: 'डिजिटल हेल्थ ट्विन: एआई भविष्यवाणी',
        subtitle: 'संभावित बीमारी के प्रकोप की भविष्यवाणी करने के लिए पानी की गुणवत्ता के पैरामीटर और जनसंख्या डेटा इनपुट करें।',
        phLabel: 'पीएच स्तर (0-14)',
        turbidityLabel: 'टर्बिडिटी (NTU)',
        tdsLabel: 'कुल घुलित ठोस (TDS) (mg/L)',
        peopleAffectedLabel: 'प्रभावित लोग (5000 में से)',
        stateLabel: 'राज्य',
        districtLabel: 'जिला',
        locationLabel: 'विशिष्ट स्थान (गाँव/क्षेत्र)',
        collectedByLabel: 'संग्रहकर्ता (कार्यकर्ता आईडी/नाम)',
        predictButton: 'बीमारी की भविष्यवाणी करें',
        predicting: 'भविष्यवाणी कर रहा है...',
        predictionResult: 'भविष्यवाणी का परिणाम',
        predictedDisease: 'भविष्यवाणी की गई बीमारी',
        healthAlert: 'स्वास्थ्य अलर्ट',
        recordSaved: 'रिकॉर्ड डेटाबेस में आईडी के साथ सहेजा गया',
        safeRanges: {
          ph: 'सुरक्षित रेंज: 6.5 - 8.5',
          turbidity: 'सुरक्षित रेंज: < 5 NTU',
          tds: 'सुरक्षित रेंज: < 500 mg/L',
          peopleAffected: '5000 जनसंख्या के नमूने में लक्षण दिखाने वाले लोगों की संख्या।'
        }
      },
      analytics: {
        title: 'व्यापक स्वास्थ्य विश्लेषण',
        subtitle: 'एकत्रित जल गुणवत्ता डेटा और बीमारी की भविष्यवाणियों से विस्तृत अंतर्दृष्टि।',
        loading: 'विश्लेषण डेटा लोड कर रहा है...',
        error: 'त्रुटि',
        retry: 'पुनः प्रयास करें',
        tabs: {
          overview: 'अवलोकन',
          records: 'रिकॉर्ड्स',
          alerts: 'अलर्ट',
          workers: 'कार्यकर्ता'
        },
        overview: {
          totalRecords: 'कुल रिकॉर्ड',
          activeAlerts: 'सक्रिय अलर्ट',
          totalWorkers: 'कुल स्वास्थ्य कार्यकर्ता',
          diseaseBreakdown: 'रोग का विवरण',
          stateBreakdown: 'राज्य का विवरण'
        },
        records: {
          title: 'हाल के स्वास्थ्य रिकॉर्ड्स',
          noRecords: 'कोई रिकॉर्ड उपलब्ध नहीं।',
          columns: {
            id: 'आईडी',
            time: 'समय',
            location: 'स्थान',
            disease: 'बीमारी',
            alert: 'अलर्ट',
            ph: 'pH',
            turbidity: 'टर्बिडिटी',
            tds: 'TDS'
          }
        },
        alerts: {
          title: 'सक्रिय स्वास्थ्य अलर्ट',
          noAlerts: 'कोई सक्रिय अलर्ट नहीं।',
          columns: {
            id: 'आईडी',
            createdAt: 'बनाया गया',
            location: 'स्थान',
            disease: 'बीमारी',
            level: 'स्तर',
            status: 'स्थिति'
          }
        },
        workers: {
          title: 'स्वास्थ्य कार्यकर्ता प्रबंधन',
          noWorkers: 'कोई स्वास्थ्य कार्यकर्ता उपलब्ध नहीं।',
          columns: {
            id: 'आईडी',
            name: 'नाम',
            workerId: 'कार्यकर्ता आईडी',
            role: 'भूमिका',
            state: 'राज्य',
            district: 'जिला',
            contact: 'संपर्क',
            active: 'सक्रिय'
          }
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'EN',
    supportedLngs: ['EN', 'AS', 'BN', 'HI'],
    interpolation: { escapeValue: false }
  });

export default i18n;