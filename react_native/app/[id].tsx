import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

type Note = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

export default function NoteDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    axios
      .get(`http://192.168.0.190:3001/notes/${id}`) // ganti IP sesuai IP laptop
      .then((res) => setNote(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleDelete = async () => {
    Alert.alert("Hapus Catatan", "Yakin ingin menghapus catatan ini?", [
      { text: "Batal" },
      {
        text: "Hapus",
        onPress: async () => {
          try {
            await axios.delete(`http://192.168.0.190:3001/notes/${id}`);
            router.replace("/(tabs)");
          } catch (err) {
            Alert.alert("Gagal menghapus catatan.");
          }
        },
      },
    ]);
  };

  if (!note)
    return <Text style={{ color: "#fff", padding: 20 }}>Memuat...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.content}>{note.content}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: "/edit/[id]",
            params: { id: String(id) },
          })
        }
      >
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#d9534f" }]}
        onPress={handleDelete}
      >
        <Text style={styles.buttonText}>Hapus</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 10 },
  content: { fontSize: 16, color: "#ccc", marginBottom: 20 },
  button: {
    backgroundColor: "#4e73df",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
