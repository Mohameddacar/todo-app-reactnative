import React, { useState, useEffect } from "react";
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  ScrollView, 
  Alert,
  Linking
} from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as Speech from "expo-speech";
import * as Clipboard from "expo-clipboard";

const Dashboard = () => {
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [loading, setLoading] = useState(true);

  // Fetch a random quote from API
  const fetchRandomQuote = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://random-quotes-freeapi.vercel.app/api/random");
      const data = await response.json();
      console.log("API Response:", data);

      setQuote({
        text: data.content || data.quote || "No quote available",
        author: data.author || "Unknown",
      });
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote({ text: "Failed to fetch quote.", author: "" });
    } finally {
      setLoading(false);
    }
  };

  // Text-to-speech
  const speakQuote = () => {
    if (quote.text) {
      Speech.speak(quote.text, {
        language: "en",
        pitch: 1.0,
        rate: 1.0,
      });
    }
  };

  // Copy quote to clipboard
  const copyQuote = async () => {
    if (quote.text) {
      await Clipboard.setStringAsync(`${quote.text} — ${quote.author}`);
      Alert.alert("Copied!", "Quote copied to clipboard.");
    }
  };

  // Share quote on Twitter
  const shareToTwitter = () => {
    if (quote.text) {
      const text = encodeURIComponent(`"${quote.text}" — ${quote.author}`);
      const url = `https://twitter.com/intent/tweet?text=${text}`;
      Linking.openURL(url).catch(err => console.error("Couldn't open Twitter", err));
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.card}>
        <Text style={styles.quoteTitle}>Quote of the Day</Text>

        <View style={styles.iconLeft}>
          <FontAwesome5 name="quote-left" size={24} color="#5372F0" />
        </View>

        <ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false}>
          <Text style={styles.quoteText}>
            {loading ? "Loading..." : quote.text?.replace(/\n/g, " ")}
          </Text>
        </ScrollView>

        <View style={styles.iconRight}>
          <FontAwesome5 name="quote-right" size={24} color="#5372F0" />
        </View>

        <Text style={styles.author}>— {quote.author}</Text>

        <TouchableOpacity onPress={fetchRandomQuote} style={styles.btn}>
          <Text style={{ color: "white", fontWeight: "600" }}>New Quote</Text>
        </TouchableOpacity>

        <View style={styles.actionRow}>
          <TouchableOpacity onPress={speakQuote} style={styles.actionBtn}>
            <FontAwesome name="volume-up" style={styles.actionIcon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={copyQuote} style={styles.actionBtn}>
            <FontAwesome name="copy" style={styles.actionIcon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={shareToTwitter} style={styles.actionBtn}>
            <FontAwesome name="twitter" style={styles.actionIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5372F0",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    marginBottom: 20,
  },
  quoteTitle: {
    fontWeight: "600",
    marginBottom: 15,
    fontSize: 24,
  },
  iconLeft: {
    alignSelf: "stretch",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  iconRight: {
    alignSelf: "stretch",
    alignItems: "flex-end",
    marginTop: 10,
  },
  quoteText: {
    fontStyle: "italic",
    fontSize: 18,
    textAlign: "center",
    lineHeight: 26,
    letterSpacing: 0.5,
    color: "#333",
    fontWeight: "400",
    marginVertical: 10,
    alignSelf: "stretch",
    flexShrink: 1,
  },
  author: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
    textAlign: "right",
    alignSelf: "stretch",
  },
  btn: {
    marginTop: 30,
    backgroundColor: "#5372F0",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 20,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  actionBtn: {
    borderWidth: 2,
    borderColor: "#5372F0",
    padding: 15,
    borderRadius: 50,
  },
  actionIcon: {
    fontSize: 24,
    color: "#5372F0",
  },
});
