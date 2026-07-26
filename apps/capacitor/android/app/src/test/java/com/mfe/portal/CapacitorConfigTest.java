package com.mfe.portal;

import org.json.JSONObject;
import org.json.JSONTokener;
import org.junit.Test;

import java.io.InputStream;

import static org.junit.Assert.*;

public class CapacitorConfigTest {

    @Test
    public void config_hasCorrectAppId() throws Exception {
        JSONObject config = loadConfig();
        assertEquals("com.mfe.portal", config.getString("appId"));
    }

    @Test
    public void config_hasCorrectAppName() throws Exception {
        JSONObject config = loadConfig();
        assertEquals("MFE Portal", config.getString("appName"));
    }

    @Test
    public void config_hasCorrectWebDir() throws Exception {
        JSONObject config = loadConfig();
        assertEquals("../host/dist", config.getString("webDir"));
    }

    @Test
    public void config_hasCleartextEnabled() throws Exception {
        JSONObject config = loadConfig();
        JSONObject server = config.getJSONObject("server");
        assertTrue(server.getBoolean("cleartext"));
    }

    @Test
    public void config_containsAllRequiredKeys() throws Exception {
        JSONObject config = loadConfig();
        assertTrue(config.has("appId"));
        assertTrue(config.has("appName"));
        assertTrue(config.has("webDir"));
        assertTrue(config.has("server"));
    }

    private JSONObject loadConfig() throws Exception {
        try (InputStream is = getClass().getClassLoader()
                .getResourceAsStream("capacitor.config.json")) {
            assertNotNull("capacitor.config.json not found in test resources", is);
            return new JSONObject(new JSONTokener(is));
        }
    }
}
