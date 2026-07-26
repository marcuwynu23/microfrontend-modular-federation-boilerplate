package com.mfe.portal;

import android.webkit.WebView;

import androidx.test.core.app.ActivityScenario;
import androidx.test.espresso.Espresso;
import androidx.test.espresso.assertion.ViewAssertions;
import androidx.test.espresso.matcher.ViewMatchers;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.filters.LargeTest;

import org.hamcrest.Matchers;
import org.junit.Test;
import org.junit.runner.RunWith;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

@RunWith(AndroidJUnit4.class)
@LargeTest
public class AppLaunchTest {

    @Test
    public void activity_launchesSuccessfully() {
        try (ActivityScenario<MainActivity> scenario = ActivityScenario.launch(MainActivity.class)) {
            assertNotNull("Activity should not be null", scenario);
        }
    }

    @Test
    public void webView_isDisplayed() {
        try (ActivityScenario<MainActivity> scenario = ActivityScenario.launch(MainActivity.class)) {
            Espresso.onView(ViewMatchers.withClassName(Matchers.endsWith("WebView")))
                    .check(ViewAssertions.matches(ViewMatchers.isDisplayed()));
        }
    }

    @Test
    public void webView_javascriptIsEnabled() {
        try (ActivityScenario<MainActivity> scenario = ActivityScenario.launch(MainActivity.class)) {
            scenario.onActivity(activity -> {
                WebView webView = activity.findViewById(android.R.id.content);
                assertNotNull("WebView should exist", webView);
                assertTrue("JavaScript must be enabled for MFE runtime",
                        webView.getSettings().getJavaScriptEnabled());
            });
        }
    }

    @Test
    public void webView_loadsNonEmptyContent() throws Exception {
        CountDownLatch latch = new CountDownLatch(1);
        AtomicReference<String> result = new AtomicReference<>();

        try (ActivityScenario<MainActivity> scenario = ActivityScenario.launch(MainActivity.class)) {
            scenario.onActivity(activity -> {
                WebView webView = activity.findViewById(android.R.id.content);
                assertNotNull(webView);

                webView.evaluateJavascript(
                        "document.body && document.body.innerHTML.length > 0 ? 'true' : 'false'",
                        value -> {
                            result.set(value);
                            latch.countDown();
                        });
            });

            assertTrue("WebView should load content within timeout",
                    latch.await(10, TimeUnit.SECONDS));
            assertTrue("WebView should render non-empty content",
                    "true".equals(result.get()));
        }
    }

    @Test
    public void webView_rendersRootElement() throws Exception {
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
                    latch.await(10, TimeUnit.SECONDS));
            assertTrue("Host app #root element must be rendered",
                    "true".equals(result.get()));
        }
    }
}
