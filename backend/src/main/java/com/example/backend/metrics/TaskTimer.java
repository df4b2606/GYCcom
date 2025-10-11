package com.example.backend.metrics;

import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Tags;
import io.micrometer.core.instrument.Timer;
import org.springframework.stereotype.Component;

import java.util.concurrent.Callable;

/**
 * Utility component to record task durations via Micrometer.
 * Exposes a single Prometheus metric name: app_task_duration_seconds
 * (Micrometer will suffix with _seconds for Prometheus; base name is app_task_duration).
 * Use the "task" tag to distinguish different tasks.
 */
@Component
public class TaskTimer {
    private static final String METRIC_NAME = "app_task_duration";

    private final MeterRegistry meterRegistry;

    public TaskTimer(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
    }

    public <T> T time(String taskName, Callable<T> callable) {
        return time(taskName, callable, Tags.empty());
    }

    public void time(String taskName, Runnable runnable) {
        time(taskName, runnable, Tags.empty());
    }

    public <T> T time(String taskName, Callable<T> callable, Tags extraTags) {
        Timer timer = Timer
                .builder(METRIC_NAME)
                .description("Task duration")
                .tags(Tags.of("task", taskName).and(extraTags))
                .publishPercentileHistogram()
                .register(meterRegistry);
        try {
            return timer.recordCallable(callable);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void time(String taskName, Runnable runnable, Tags extraTags) {
        Timer timer = Timer
                .builder(METRIC_NAME)
                .description("Task duration")
                .tags(Tags.of("task", taskName).and(extraTags))
                .publishPercentileHistogram()
                .register(meterRegistry);
        timer.record(runnable);
    }
}


