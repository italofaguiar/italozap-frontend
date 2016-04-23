#/bin/bash

if [ -z "$1" ];
then
  echo "Forneça um argumento com o nome final do apk e sua versao (sem extensao apk)"
  exit 1
fi

echo
echo "------------------------- ionic build --release android  ------------------------"
echo
ionic build --release android
cp ./platforms/android/build/outputs/apk/android-release-unsigned.apk .
cp android-release-unsigned.apk android-release-signed.apk

echo
echo "--------------- jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ~/italofaguiar.keystore android-release-signed.apk italofaguiar  -------------------"
echo
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ~/italofaguiar.keystore android-release-signed.apk italofaguiar

echo
echo "---------- /usr/local/bin/android-sdk-macosx/build-tools/23.0.2/zipalign -v 4 android-release-signed.apk android-release-signed-aligned.apk  --------------"
echo
rm android-release-signed-aligned.apk 
/usr/local/bin/android-sdk-macosx/build-tools/23.0.2/zipalign -v 4 android-release-signed.apk android-release-signed-aligned.apk

cp android-release-signed-aligned.apk $1.apk
