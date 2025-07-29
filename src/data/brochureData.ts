export interface BrochureItem {
  id: string;
  text: string;
  type?: 'warning' | 'info' | 'success';
  checkable?: boolean;
}

export interface BrochureSection {
  id: string;
  title: string;
  icon?: string;
  items: BrochureItem[];
}

export interface BrochureData {
  id: string;
  title: string;
  description: string;
  category: string;
  version: string;
  estimatedReadTime: string;
  sections: BrochureSection[];
}

export const availableBrochures: BrochureData[] = [
  {
    id: "myomectomy-aftercare",
    title: "Abdominal Myomectomy Aftercare",
    description: "Complete recovery guide for patients after abdominal myomectomy surgery",
    category: "Gynecological Surgery",
    version: "1.0.0",
    estimatedReadTime: "15 min",
    sections: [
      {
        id: "preparation",
        title: "Preparation for Surgery",
        icon: "Calendar",
        items: [
          { id: "prep-1", text: "Fast for 8-12 hours before surgery as instructed", checkable: true },
          { id: "prep-2", text: "Remove all jewelry, makeup, and nail polish", checkable: true },
          { id: "prep-3", text: "Arrange for someone to drive you home", checkable: true },
          { id: "prep-4", text: "Take prescribed pre-operative medications as directed", checkable: true },
          { id: "prep-5", text: "Shower with antibacterial soap the night before", checkable: true }
        ]
      },
      {
        id: "during-surgery",
        title: "What to Expect During Surgery",
        icon: "Activity",
        items: [
          { id: "during-1", text: "Surgery typically takes 2-4 hours depending on complexity" },
          { id: "during-2", text: "General anesthesia will be used throughout the procedure" },
          { id: "during-3", text: "An abdominal incision will be made to access the uterus" },
          { id: "during-4", text: "Fibroids will be carefully removed while preserving the uterus" },
          { id: "during-5", text: "The incision will be closed with sutures or staples" }
        ]
      },
      {
        id: "after-surgery",
        title: "What to Expect After Surgery",
        icon: "Clock",
        items: [
          { id: "after-1", text: "You'll spend 1-3 days in the hospital for monitoring" },
          { id: "after-2", text: "Pain and discomfort at the incision site is normal" },
          { id: "after-3", text: "Some bloating and gas pain may occur" },
          { id: "after-4", text: "Light vaginal bleeding or discharge is expected for 2-6 weeks" },
          { id: "after-5", text: "Fatigue is common during the first few weeks" }
        ]
      },
      {
        id: "activity",
        title: "Activity Restrictions",
        icon: "AlertTriangle",
        items: [
          { id: "activity-1", text: "No lifting more than 10 pounds for 4-6 weeks", type: "warning", checkable: true },
          { id: "activity-2", text: "No driving while taking prescription pain medication", type: "warning", checkable: true },
          { id: "activity-3", text: "Avoid strenuous exercise for 6-8 weeks", type: "warning", checkable: true },
          { id: "activity-4", text: "No sexual activity for 6 weeks or until cleared by doctor", type: "warning", checkable: true },
          { id: "activity-5", text: "Walk regularly to prevent blood clots", type: "success", checkable: true },
          { id: "activity-6", text: "Gradually increase daily activities as tolerated", checkable: true }
        ]
      },
      {
        id: "pain-management",
        title: "Pain & Medication Management",
        icon: "Pill",
        items: [
          { id: "pain-1", text: "Take prescribed pain medications as directed", checkable: true },
          { id: "pain-2", text: "Use ice packs for 15-20 minutes to reduce swelling", checkable: true },
          { id: "pain-3", text: "Keep a pain diary to track improvement" },
          { id: "pain-4", text: "Don't skip doses - stay ahead of the pain" },
          { id: "pain-5", text: "Contact doctor if pain worsens or doesn't improve", type: "warning" }
        ]
      },
      {
        id: "warning-signs",
        title: "Warning Signs & When to Call Doctor",
        icon: "AlertCircle",
        items: [
          { id: "warning-1", text: "Fever over 101°F (38.3°C)", type: "warning" },
          { id: "warning-2", text: "Heavy vaginal bleeding (soaking a pad every hour)", type: "warning" },
          { id: "warning-3", text: "Severe abdominal pain not controlled by medication", type: "warning" },
          { id: "warning-4", text: "Signs of infection: redness, warmth, or pus at incision", type: "warning" },
          { id: "warning-5", text: "Difficulty breathing or chest pain", type: "warning" },
          { id: "warning-6", text: "Leg swelling, pain, or warmth (sign of blood clot)", type: "warning" },
          { id: "warning-7", text: "Nausea and vomiting preventing fluid intake", type: "warning" }
        ]
      },
      {
        id: "incision-care",
        title: "Incision & Home Care",
        icon: "Shield",
        items: [
          { id: "incision-1", text: "Keep incision clean and dry", checkable: true },
          { id: "incision-2", text: "Shower (don't soak) starting 48 hours after surgery", checkable: true },
          { id: "incision-3", text: "Pat incision dry gently - don't rub", checkable: true },
          { id: "incision-4", text: "Change dressings as instructed by your care team", checkable: true },
          { id: "incision-5", text: "Watch for signs of infection daily", checkable: true },
          { id: "incision-6", text: "Avoid tight clothing over the incision area", checkable: true }
        ]
      },
      {
        id: "diet-recovery",
        title: "Diet and Recovery Timeline",
        icon: "Utensils",
        items: [
          { id: "diet-1", text: "Start with clear liquids, advance as tolerated" },
          { id: "diet-2", text: "Eat high-fiber foods to prevent constipation", checkable: true },
          { id: "diet-3", text: "Stay well hydrated - aim for 8 glasses of water daily", checkable: true },
          { id: "diet-4", text: "Week 1-2: Focus on rest and gentle movement" },
          { id: "diet-5", text: "Week 3-4: Gradually increase activity level" },
          { id: "diet-6", text: "Week 6-8: Most normal activities can be resumed" },
          { id: "diet-7", text: "Full recovery typically takes 6-8 weeks" }
        ]
      },
      {
        id: "followup",
        title: "Follow-Up & Appointments",
        icon: "Calendar",
        items: [
          { id: "followup-1", text: "Schedule follow-up appointment within 2 weeks", checkable: true },
          { id: "followup-2", text: "Attend all scheduled post-operative visits", checkable: true },
          { id: "followup-3", text: "Prepare questions for your healthcare team", checkable: true },
          { id: "followup-4", text: "Discuss return to work timeline", checkable: true },
          { id: "followup-5", text: "Review pathology results when available" },
          { id: "followup-6", text: "Plan future monitoring schedule" }
        ]
      }
    ]
  },
  {
    id: "laparoscopic-surgery",
    title: "Laparoscopic Surgery Recovery",
    description: "Minimally invasive surgery recovery guidelines and care instructions",
    category: "Minimally Invasive Surgery",
    version: "1.2.0",
    estimatedReadTime: "12 min",
    sections: [
      {
        id: "pre-op",
        title: "Pre-Operative Instructions",
        icon: "Calendar",
        items: [
          { id: "lap-prep-1", text: "Fast for 8 hours before surgery", checkable: true },
          { id: "lap-prep-2", text: "Remove all jewelry and piercings", checkable: true },
          { id: "lap-prep-3", text: "Wear comfortable, loose-fitting clothes", checkable: true }
        ]
      },
      {
        id: "post-op-care",
        title: "Post-Operative Care",
        icon: "Shield",
        items: [
          { id: "lap-post-1", text: "Keep incision sites clean and dry", checkable: true },
          { id: "lap-post-2", text: "Watch for signs of infection", type: "warning" },
          { id: "lap-post-3", text: "Light activity is encouraged", type: "success", checkable: true }
        ]
      }
    ]
  },
  {
    id: "cardiac-surgery",
    title: "Cardiac Surgery Aftercare",
    description: "Comprehensive heart surgery recovery and rehabilitation guide",
    category: "Cardiac Surgery",
    version: "2.1.0",
    estimatedReadTime: "20 min",
    sections: [
      {
        id: "heart-recovery",
        title: "Heart Recovery Basics",
        icon: "Heart",
        items: [
          { id: "heart-1", text: "Take prescribed heart medications exactly as directed", checkable: true },
          { id: "heart-2", text: "Monitor blood pressure daily", checkable: true },
          { id: "heart-3", text: "Attend cardiac rehabilitation sessions", type: "success", checkable: true }
        ]
      },
      {
        id: "heart-warning",
        title: "Cardiac Warning Signs",
        icon: "AlertTriangle",
        items: [
          { id: "heart-warn-1", text: "Chest pain or pressure", type: "warning" },
          { id: "heart-warn-2", text: "Shortness of breath", type: "warning" },
          { id: "heart-warn-3", text: "Irregular heartbeat", type: "warning" }
        ]
      }
    ]
  }
];

// Helper function to get a specific brochure by ID
export const getBrochureById = (id: string): BrochureData | undefined => {
  return availableBrochures.find(brochure => brochure.id === id);
};

// For backward compatibility
export const myomectomyBrochure = availableBrochures[0];