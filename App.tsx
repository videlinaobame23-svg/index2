/**
 * M4 · MEMBER 2 · Put the screens together and connect them to the API
 *
 * Owner (your GitHub username): @videlinaobame23-svg
 *
 * 1. In addDelivery, make it async and call getRisk + sendDelivery.
 * 2. Put the laptop's address in src/config.ts.
 * 3. Run on a phone (npx expo start, scan with Expo Go). Save one cold, fresh
 *    can (6 °C, 1 h) and one warm, old can (28 °C, 6 h). Take a screenshot,
 *    save it as docs/screenshot.png and push it through a pull request.
 */
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import DeliveryForm from './src/components/DeliveryForm';
import DeliveryList from './src/components/DeliveryList';
import StatusBanner from './src/components/StatusBanner';
import { API_URL } from './src/config';
import { getRisk, sendDelivery } from './src/api';
import type { Delivery, NewDelivery } from './src/logic';

export default function App() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);

  async function addDelivery(d: NewDelivery) {
    const result = await getRisk(API_URL, d.tempC, d.hours);
    const sent = await sendDelivery(API_URL, d);
    const saved: Delivery = {
      ...d,
      id: String(Date.now()),
      risk: result ? result.risk : null,
      sent,
    };
    setDeliveries((old) => [saved, ...old]);
  }

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Milk Check</Text>
      <StatusBanner apiUrl={API_URL} />
      <DeliveryForm onSave={addDelivery} />
      <DeliveryList deliveries={deliveries} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, padding: 24, gap: 12, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '700', marginTop: 32 },
});