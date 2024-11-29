import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Privacy = () => {
  return (
    <View className="w-full h-screen px-2 ">
      <SafeAreaView className="w-full h-full">
        <ScrollView className="w-full h-full">
          <View className="w-full flex items-center justify-center">
            <Text className="text-3xl text-blue-500 font-bold">
              Privacy Policy
            </Text>
          </View>
          <View className="w-full mt-4 flex gap-4">
            <View className="w-full">
              <Text className="text-xl font-bold">
                1. Information We Collect
              </Text>
              <View>
                <Text>We may collect the following types of information:</Text>
                <Text className="text-lg font-bold">
                  a. Personal Information
                </Text>
                <Text className="pl-2">
                  Name, email address, phone number, and password during account
                  registration. Payment details for booking and subscription
                  purposes.
                </Text>
                <Text className="text-lg font-bold">b. Usage Data</Text>
                <Text className="pl-2">
                  Information about how you use our app, including room
                  searches, booking history, and preferences.
                </Text>
                <Text className="text-lg font-bold">c. Device Data</Text>
                <Text className="pl-2">
                  IP address, device type, operating system, and app version for
                  security and troubleshooting.
                </Text>
                <Text className="text-lg font-bold">d. Location Data</Text>
                <Text className="pl-2">
                  With your consent, we may collect location data to recommend
                  nearby rooms or tiffin services.
                </Text>
              </View>
            </View>
          </View>
          <View className="w-full mt-4 flex gap-4">
            <View className="w-full">
              <Text className="text-xl font-bold">
                2. How We Use Your Information
              </Text>
              <View>
                <Text>We use your information to:</Text>

                <Text className="pl-2">
                  1. Provide, improve, and personalize our services.
                </Text>
                <Text className="pl-2">
                  2. Facilitate bookings and manage user accounts.
                </Text>
                <Text className="pl-2">
                  3.Send booking confirmations, updates, and promotional offers.
                </Text>
                <Text className="pl-2">
                  4. Ensure security and prevent fraudulent activities.
                </Text>
                <Text className="pl-2">5.Comply with legal obligations.</Text>
              </View>
            </View>
          </View>
          <View className="w-full mt-4 flex gap-4">
            <View className="w-full">
              <Text className="text-xl font-bold">
                3. How We Share Your Information
              </Text>
              <View>
                <Text>
                  We do not sell your personal information to third parties.
                  However, we may share your data:
                </Text>

                <Text className="pl-2">
                  With trusted service providers for payment processing and room
                  management.
                </Text>
                <Text className="pl-2">
                  To comply with legal requirements or respond to valid
                  government requests.
                </Text>
                <Text className="pl-2">
                  If necessary, to protect the rights, property, or safety of
                  roomiFy, its users, or others.
                </Text>
              </View>
            </View>
          </View>
          <View className="w-full mt-4 flex gap-4">
            <View className="w-full">
              <Text className="text-xl font-bold">4. Data Security</Text>
              <View>
                <Text>
                  We implement robust security measures, including encryption
                  and secure servers, to protect your data. However, no method
                  of data transmission over the Internet is entirely secure, and
                  we cannot guarantee absolute security.
                </Text>
              </View>
            </View>
          </View>
          <View className="w-full mt-4 flex gap-4">
            <View className="w-full">
              <Text className="text-xl font-bold">5. Your Rights</Text>
              <View>
                <Text className="text-lg">
                  As a user, you have the right to:
                </Text>
                <Text>
                  1.Access, update, or delete your account information.
                </Text>
                <Text>2.Opt out of marketing communications.</Text>
                <Text>
                  3.Restrict the processing of your personal data in certain
                  circumstances.
                </Text>
              </View>
            </View>
          </View>
          <View className="w-full mt-4 flex gap-4">
            <View className="w-full">
              <Text className="text-xl font-bold">
                6. Cookies and Tracking Technologies
              </Text>
              <View>
                <Text>
                  We use cookies to enhance your experience and collect data
                  about your interactions with roomiFy. You can manage or
                  disable cookies through your browser settings.
                </Text>
              </View>
            </View>
          </View>
          <View className="w-full mt-4 flex gap-4">
            <View className="w-full">
              <Text className="text-xl font-bold">7. Third-Party Links</Text>
              <View>
                <Text>
                  Our app may contain links to third-party websites or services.
                  We are not responsible for the privacy practices or content of
                  these third parties. Please review their policies before
                  sharing any information.
                </Text>
              </View>
            </View>
          </View>
          <View className="w-full mt-4 flex gap-4">
            <View className="w-full">
              <Text className="text-xl font-bold">8. Children's Privacy</Text>
              <View>
                <Text>
                  roomiFy is not intended for users under 13 years of age. We do
                  not knowingly collect personal data from children. If we learn
                  that a child’s information has been collected, we will delete
                  it immediately.
                </Text>
              </View>
            </View>
          </View>
          <View className="w-full mt-4 flex gap-4">
            <View className="w-full">
              <Text className="text-xl font-bold">
                9. Changes to This Privacy Policy
              </Text>
              <View>
                <Text>
                  We may update this Privacy Policy from time to time. Any
                  changes will be effective upon posting. We encourage you to
                  review this page periodically for the latest updates.
                </Text>
              </View>
            </View>
          </View>
          <View className="w-full mt-4 flex gap-4">
            <View className="w-full">
              <Text className="text-xl font-bold">10. Contact Us</Text>
              <View>
                <Text className="text-lg">
                  If you have any questions or concerns about this Privacy
                  Policy, please contact us at:
                </Text>
                <Text>Email: pritam7796419792@gmail.com</Text>
                <Text>Phone: 7796419792</Text>
                <Text>
                  Thank you for trusting roomiFy. We are committed to protecting
                  your privacy.
                </Text>
              </View>
            </View>
          </View>
          <View className="w-full mt-4 flex gap-4">
            <View className="w-full">
              <Text className="text-xl font-bold">10. Contact Us</Text>
              <View>
                <Text className="text-lg">
                  If you have any questions or concerns about this Privacy
                  Policy, please contact us at:
                </Text>
                <Text>Email: pritam7796419792@gmail.com</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Privacy;
