package com.mfe.portal;

import org.junit.Test;

import static org.junit.Assert.*;

public class BuildConfigTest {

    @Test
    public void packageName_isComMfePortal() {
        assertEquals("com.mfe.portal", BuildConfig.APPLICATION_ID);
    }

    @Test
    public void buildType_isDebug() {
        assertEquals("debug", BuildConfig.BUILD_TYPE);
    }

    @Test
    public void versionCode_isPositive() {
        assertTrue("versionCode should be positive", BuildConfig.VERSION_CODE > 0);
    }

    @Test
    public void versionName_isNotEmpty() {
        assertNotNull(BuildConfig.VERSION_NAME);
        assertFalse(BuildConfig.VERSION_NAME.isEmpty());
    }
}
