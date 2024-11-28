import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Accordion } from "@/components/Accordion";

// Procedures data
const procedures = [
  {
    id: "1",
    title: "צפצוף",
    description: `
 ממרכז הבקרה בלובי
       •  לוחצים על השתקת צופרים
       •   הכנסת קוד 1111
       •  לחיצה על אישור`,
  },
  {
    id: "2",
    title: "צבע אדום",
    description:
      "ריצה למקום מוגן כמו ממד שנמצא מאחורי השומר, או חדר מדרגות ליד מעליות חניון",
  },
  {
    id: "3",
    title: "אזעקה או תקלה במערכת גילוי אש",
    description: `במקרה של אזעקה או תקלה תופעל מערכת הגילוי בבניין, ותצור אזעקות וצפצופים ברכזת הגילוי של הבניין.

    שלבים לטיפול ארועים במערכת הגילוי וסריקת מפגעים:
    • יש לראות את סוג ואיזור שממנו נובעת האזעקה בפנל המערכת
    • לחץ על לחצן חייב לחץ קוד 1111 לצורך נטרול או שחרור החייגן
    • עמוד על אזור האזעקה הקיימת בפנל ולחץ על לחצן נטרול 111 ולחץ אישור ולאחר מכן לחץ על לחצן השב`,
  },
  {
    id: "4",
    title: "בדיקת מיקום האירוע",
    description: `
    • יש לאתר התקלה המטופלת על פי הכתובת של האביזר (חיישן,גלאי,מפסק)
    • שרטוט ונקודת האביזר וצבע סריקה באיזור לצורך זיהוי מפגעי כוחות כיבוי אש והנהלת הבניין
    • עד הגעת הכוחות יש להזהיר למנוע ולנסות לכבות את השריפה על פי נוהלי כיבוי אש`,
  },
  {
    id: "5",
    title: "חשוב לדעת באפשרות המיידית",
    description: `
    • בכל מקרה של אירוע אמת או ברק יש חובה לעדכן את מנהל אחזקה או מנהל בניין
    • במקרה שברביעית נפתרה יש לעמוד ברכזת הגילוי על הארוע המנוטרל וללחוץ על אישור וללחוץ את הקוד 1111 וללחוץ אישור ואז וללחוץ על כפתור השב`,
  },
  {
    id: "6",
    title: "פתיחת שערים",
    description: `
    • שער כניסה לטייזו - פתיחה עם שלט שחור לחצן 1
    • שער חניון לוינשטיין - חיוג מטלפון עמדה: פתיחת שער לוינשטיין 1
    • שער חניון גדול תת קרקעי - לחצן עגול בעמדה מתחת לשולחן
    • מחסום יציאה חניון תת קרקעי - לחיצה על לחצן לבן עם ציור של מפתח בעמדה`,
  },
  {
    id: "7",
    title: "שאלות נפוצות על מקומות באיזור",
    description: `
   • בית השמחות - יציאה ראשית ימינה , הבניין הבא
   • מגזינו - יציאה ראשית ימינה , הבניין הבא 
   • רחוב טיומקין - יציאה מדלתות אחוריות של לובי ( לייד טייזו)
   • מגדל סונות - מול הכניסה הראשית , לחצות כביש . המגדל מצד ימין
    `,
  },
  {
    id: "8",
    title: "קוד חדר זבל",
    description: `
   • 2403#
    `,
  },
  {
    id: "9",
    title: "נעילת דלתות",
    description: `
   • החל משעה 11 בלילה
    `,
  },
  {
    id: "10",
    title: "נוהל יומן",
    description: `
   • החל משעה 9 בערב רישום ביומן של כל מי שעולה לקומות
    `,
  },
];

export default function ProceduresComponent() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.card}>
        <Text style={styles.title}>נהלים</Text>

        <View style={styles.alert}>
          <Ionicons name="alert-circle-outline" size={24} color="#ef4444" />
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>חשוב!</Text>
            <Text style={styles.alertDescription}>
              הוראות הפעלה למערכת גילוי אש TELEFIRE ADR-300 ונהלים נוספים
            </Text>
          </View>
        </View>

        {procedures.map((procedure) => (
          <Accordion
            key={procedure.id}
            title={procedure.title}
            isExpanded={expandedId === procedure.id}
            onToggle={() => toggleAccordion(procedure.id)}
          >
            <Text style={styles.accordionContent}>{procedure.description}</Text>
          </Accordion>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  alert: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fef2f2",
    borderColor: "#ef4444",
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
  },
  alertContent: {
    marginLeft: 12,
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ef4444",
  },
  alertDescription: {
    fontSize: 14,
    color: "#ef4444",
  },
  accordionContent: {
    textAlign: "right",
  },
});
