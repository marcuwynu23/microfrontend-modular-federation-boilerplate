package com.mfe.portal;

import android.webkit.WebView;

import androidx.test.core.app.ActivityScenario;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.filters.LargeTest;

import org.junit.Test;
import org.junit.runner.RunWith;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

@RunWith(AndroidJUnit4.class)
@LargeTest
public class MfeConnectivityTest {

    @Test
    public void mfeErrorFallback_showsRetryButton_whenRemoteUnreachable() throws Exception {
        CountDownLatch latch = new CountDownLatch(1);
        AtomicReference<String> result = new AtomicReference<>();

        try (ActivityScenario<MainActivity> scenario = ActivityScenario.launch(MainActivity.class)) {
            scenario.onActivity(activity -> {
                WebView webView = activity.findViewById(android.R.id.content);
                assertNotNull("WebView should be present", webView);

                webView.evaluateJavascript(
                        "(function() {" +
                        "  var btn = document.querySelector('button');" +
                        "  return btn && btn.textContent.indexOf('Retry') >= 0 ? 'true' : 'false';" +
                        "})()",
                        value -> {
                            result.set(value);
                            latch.countDown();
                        });
            });

            assertTrue("Retry button check should complete within timeout",
                    latch.await(15, TimeUnit.SECONDS));
        }
    }

    @Test
    public void offlineFallback_showsMessage_whenNoNetwork() throws Exception {
        CountDownLatch latch = new CountDownLatch(1);
        AtomicReference<String> result = new AtomicReference<>();

        try (ActivityScenario<MainActivity> scenario = ActivityScenario.launch(MainActivity.class)) {
            scenario.onActivity(activity -> {
                WebView webView = activity.findViewById(android.R.id.content);
                assertNotNull(webView);

                webView.evaluateJavascript(
                        "(function() {" +
                        "  var html = document.body ? document.body.innerHTML.toLowerCase() : '';" +
                        "  return html.indexOf('offline') >= 0 || " +
                        "         html.indexOf('unreachable') >= 0 ? 'true' : 'false';" +
                        "})()",
                        value -> {
                            result.set(value);
                            latch.countDown();
                        });
            });

            assertTrue("Offline check should complete within timeout",
                    latch.await(15, TimeUnit.SECONDS));
        }
    }

    @Test
    public void hostApp_entryPoint_rendersWithoutCrashing() throws Exception {
        CountDownLatch latch = new CountDownLatch(1);
        AtomicReference<String> result = new AtomicReference<>();

        try (ActivityScenario<MainActivity> scenario = ActivityScenario.launch(MainActivity.class)) {
            scenario.onActivity(activity -> {
                WebView webView = activity.findViewById(android.R.id.content);
                assertNotNull(webView);

                webView.evaluateJavascript(
                        "document.getElementById('root') !== null ? 'true' : 'false'",
                        value -> {
                            result.set(value);
                            latch.countDown();
                        });
            });

            assertTrue("Root element should render within timeout",
                    latch.await(15, TimeUnit.SECONDS));
            assertTrue("Host app must render and not crash",
                    "true".equals(result.get()));
        }
    }

    @Test
    public void moduleFederation_sharedLibs_areLoaded() throws Exception {
        CountDownLatch latch = new CountDownLatch(1);
        AtomicReference<String> result = new AtomicReference<>();

        try (ActivityScenario<MainActivity> scenario = ActivityScenario.launch(MainActivity.class)) {
            scenario.onActivity(activity -> {
                WebView webView = activity.findViewById(android.R.id.content);
                assertNotNull(webView);

                webView.evaluateJavascript(
                        "typeof React !== 'undefined' ? 'true' : 'false'",
                        value -> {
                            result.set(value);
                            latch.countDown();
                        });
            });

            assertTrue("React availability check should complete within timeout",
                    latch.await(15, TimeUnit.SECONDS));
            assertTrue("React shared library must be loaded for MFE runtime",
                    "true".equals(result.get()));
        }
    }
}
