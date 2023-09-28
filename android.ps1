# Define the path to your Android SDK
$androidSdkPath = "C:\Users\itemi\AppData\Local\Android\Sdk"

# Set the ANDROID_HOME environment variable
[Environment]::SetEnvironmentVariable("ANDROID_HOME", $androidSdkPath, [EnvironmentVariableTarget]::User)

# Create or update the local.properties file
$localPropertiesPath = "C:\Users\itemi\Projects\prescriptionPrinter\android\local.properties"

# Check if the file already exists, if not, create it
if (-not (Test-Path $localPropertiesPath)) {
    New-Item -Path $localPropertiesPath -ItemType File
}

# Add the sdk.dir line to local.properties
Set-Content -Path $localPropertiesPath -Value "sdk.dir=$androidSdkPath"

Write-Host "ANDROID_HOME environment variable and local.properties file created/updated successfully."
