package com.mfe.portal;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;

import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.platform.app.InstrumentationRegistry;

import org.junit.Test;
import org.junit.runner.RunWith;

import static org.junit.Assert.*;

@RunWith(AndroidJUnit4.class)
public class ApplicationInfoTest {

    @Test
    public void packageName_isCorrect() {
        Context appContext = InstrumentationRegistry.getInstrumentation().getTargetContext();
        assertEquals("com.mfe.portal", appContext.getPackageName());
    }

    @Test
    public void appLabel_isMfePortal() {
        Context appContext = InstrumentationRegistry.getInstrumentation().getTargetContext();
        PackageManager pm = appContext.getPackageManager();
        String label = pm.getApplicationLabel(appContext.getApplicationInfo()).toString();
        assertEquals("MFE Portal", label);
    }

    @Test
    public void internetPermission_isDeclared() throws Exception {
        Context appContext = InstrumentationRegistry.getInstrumentation().getTargetContext();
        PackageInfo packageInfo = appContext.getPackageManager()
                .getPackageInfo(appContext.getPackageName(), PackageManager.GET_PERMISSIONS);
        String[] permissions = packageInfo.requestedPermissions;
        assertNotNull("Permissions should be declared", permissions);
        boolean hasInternet = false;
        for (String perm : permissions) {
            if ("android.permission.INTERNET".equals(perm)) {
                hasInternet = true;
                break;
            }
        }
        assertTrue("INTERNET permission must be declared for MFE loading", hasInternet);
    }

    @Test
    public void versionCode_isPositive() throws Exception {
        Context appContext = InstrumentationRegistry.getInstrumentation().getTargetContext();
        PackageInfo packageInfo = appContext.getPackageManager()
                .getPackageInfo(appContext.getPackageName(), 0);
        assertTrue("Version code must be positive", packageInfo.versionCode > 0);
    }

    @Test
    public void versionName_isNotEmpty() throws Exception {
        Context appContext = InstrumentationRegistry.getInstrumentation().getTargetContext();
        PackageInfo packageInfo = appContext.getPackageManager()
                .getPackageInfo(appContext.getPackageName(), 0);
        assertNotNull(packageInfo.versionName);
        assertFalse(packageInfo.versionName.isEmpty());
    }
}
