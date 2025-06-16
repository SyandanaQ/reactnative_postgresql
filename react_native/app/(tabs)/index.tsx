import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

type Note = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

export default function HomeScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const router = useRouter();

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/notes`);
      setNotes(res.data);
    } catch (err) {
      console.log("Gagal mengambil data:", err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchNotes();
    }, [])
  );

  const handleEdit = (id: number) => {
    router.push({ pathname: "/edit/[id]", params: { id: String(id) } });
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      "Konfirmasi Hapus",
      "Apakah kamu yakin ingin menghapus catatan ini?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            try {
              await axios.delete(`${BASE_URL}/notes/${id}`);
              fetchNotes();
            } catch (err) {
              console.log("Gagal menghapus:", err);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daftar Catatan</Text>

      {notes.length === 0 ? (
        <Text style={styles.empty}>Belum ada catatan.</Text>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.note}>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.content} numberOfLines={2}>
                  {item.content}
                </Text>
              </View>
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEdit(item.id)}
                >
                  <Text style={styles.buttonTextSmall}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.buttonTextSmall}>Hapus</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/new")}
      >
        <Text style={styles.buttonText}>+ Tambah Catatan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  empty: { color: "#666", fontStyle: "italic" },
  note: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  title: { fontWeight: "bold", color: "#000", marginBottom: 4 },
  content: { color: "#333" },
  buttonGroup: {
    marginLeft: 10,
    flexDirection: "row",
    gap: 6,
  },
  editButton: {
    backgroundColor: "#4e73df",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  buttonTextSmall: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
