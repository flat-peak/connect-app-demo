import Header from "../layout/Header";
import { Text, View } from "react-native";
import Button from "../form-controls/Button";
import PeriodCaption from "../common/PeriodCaption";
import ScheduleGraph from "../common/ScheduleGraph";
import { extractPeaks } from "../../global/peak-utils";
import Wrapper from "../layout/Wrapper";
import { theme } from "../../theme/secondary";
import { ThemeProvider } from "styled-components";
import { ScreenSafeView, ScreenScrollView } from "../layout/View";
import Divider from "../layout/Divider";
import ScheduleSummary from "../common/ScheduleSummary";
import {
  Section,
  SectionButton,
  SectionHeader,
} from "../form-controls/Section";
import { ProductSummary } from "../common/ProductSummary";
import {
  resolveMonthLabelByKey,
  TARIFF_ALL_DAYS,
  TARIFF_ALL_MONTHS,
  TARIFF_DAYS,
  TARIFF_MONTHS,
  TARIFF_SIDE,
  TARIFF_WEEKDAYS,
  TARIFF_WEEKEND,
} from "../../data/tariff-constants";
import ErrorDialog from "../dialogs/error-dialog";
import { useEffect, useState } from "react";
import LoaderDialog from "../dialogs/loader-dialog";
import TabSwitcher from "../form-controls/TabSwitcher";
import { isConnectableProvider } from "../../global/common";

/**
 * @param navigation
 * @param {Tariff} plan
 * @param {string} title
 * @param saveManualTariff
 * @param saveConnectedTariff
 * @param {Provider} provider
 * @param {boolean} saved
 * @param findWeekdaySchedule
 * @param error
 * @param dismissError
 * @param {boolean} loading
 * @return {JSX.Element}
 * @constructor
 */
export default function Summary({
  navigation,
  plan,
  title,
  saveManualTariff,
  saveConnectedTariff,
  provider,
  saved,
  findWeekdaySchedule,
  error,
  dismissError,
  loading,
}) {
  const sides = [
    { title: "Import", id: TARIFF_SIDE.IMPORT },
    { title: "Export", id: TARIFF_SIDE.EXPORT },
  ];

  const [side, setSide] = useState(TARIFF_SIDE.IMPORT);

  useEffect(() => {
    if (saved) {
      navigation.push("DataOutput");
    }
  });

  /** @type {TariffSchedule} */
  const importSchedule = findWeekdaySchedule(plan[TARIFF_SIDE.IMPORT]);

  /** @type {TariffSchedule} */
  const exportSchedule = findWeekdaySchedule(plan[TARIFF_SIDE.EXPORT]);

  const hasExportOption = exportSchedule && exportSchedule.data?.length;

  const targetSchedule =
    side === TARIFF_SIDE.IMPORT || !hasExportOption
      ? importSchedule
      : exportSchedule;

  const displayedSeasons = targetSchedule
    ? targetSchedule.data.map((entry) => ({
        side: side,
        entry: entry,
      }))
    : [];

  const isManualTariff = !isConnectableProvider(provider);

  return (
    <ThemeProvider theme={theme}>
      <ScreenScrollView>
        <Header title={"Your tariff summary"} />
        <Wrapper>
          <LoaderDialog visible={loading} />
          <ErrorDialog
            isVisible={error.visible}
            title={error.title}
            message={error.message}
            onDismiss={dismissError}
          />
          <Section>
            <SectionHeader isFirst={true}>
              <ProductSummary provider={provider} title={title} />
              {isManualTariff && (
                <SectionButton
                  label={"Edit"}
                  onPress={() => navigation.push("TariffSetup")}
                />
              )}
            </SectionHeader>
          </Section>

          {hasExportOption && (
            <>
              <Divider />
              <TabSwitcher
                options={sides}
                value={side}
                onChange={(v) => setSide(v)}
              />
            </>
          )}

          <Divider style={{ marginBottom: hasExportOption ? 22 : 44 }} />

          {displayedSeasons.map(({ entry, side }, index) => {
            let monthFrom = entry.months[0];
            let monthTo = entry.months[entry.months.length - 1];
            if (entry.months[0] === TARIFF_ALL_MONTHS) {
              monthFrom = TARIFF_MONTHS[0];
              monthTo = TARIFF_MONTHS[TARIFF_MONTHS.length - 1];
            }

            return (
              <View key={side + "_" + index.toString()}>
                {entry.days_and_hours.map((daysData, dayIndex) => {
                  let dayFrom = daysData.days[0];
                  let dayTo = daysData.days[daysData.days.length - 1];

                  if (
                    !daysData.days.length ||
                    daysData.days[0] === TARIFF_ALL_DAYS
                  ) {
                    dayFrom = TARIFF_DAYS[0];
                    dayTo = TARIFF_DAYS[TARIFF_DAYS.length - 1];
                  } else if (daysData.days[0] === TARIFF_WEEKDAYS) {
                    dayFrom = TARIFF_DAYS[0];
                    dayTo = TARIFF_DAYS[4];
                  } else if (daysData.days[0] === TARIFF_WEEKEND) {
                    dayFrom = TARIFF_DAYS[5];
                    dayTo = TARIFF_DAYS[6];
                  }

                  const peaks = extractPeaks(daysData.hours);

                  return (
                    <View key={dayIndex.toString()}>
                      <Section>
                        <SectionHeader>
                          <PeriodCaption
                            monthFrom={resolveMonthLabelByKey(monthFrom)}
                            monthTo={resolveMonthLabelByKey(monthTo)}
                            dates={entry.dates || []}
                            dayFrom={dayFrom}
                            dayTo={dayTo}
                          />
                          {isManualTariff && (
                            <SectionButton
                              label={"Edit"}
                              onPress={() =>
                                navigation.navigate("Prices", {
                                  side,
                                  seasonIndex: index,
                                  daysIndex: dayIndex,
                                })
                              }
                            />
                          )}
                        </SectionHeader>
                        {peaks.length ? (
                          <>
                            <ScheduleGraph
                              style={{ marginTop: 23 }}
                              peaks={peaks}
                            />
                            <ScheduleSummary peaks={peaks} />
                          </>
                        ) : (
                          <Text>No data</Text>
                        )}
                      </Section>
                      <Divider style={{ marginBottom: 22 }} />
                    </View>
                  );
                })}
              </View>
            );
          })}
          <ScreenSafeView edges={["right", "left", "bottom"]}>
            <Button
              title={"Save"}
              variant="executive"
              disabled={loading}
              onPress={() => {
                if (isConnectableProvider(provider)) {
                  saveConnectedTariff();
                } else {
                  saveManualTariff();
                }
              }}
            />
            <Button
              title={"Start Over"}
              variant="destructive"
              disabled={loading}
              onPress={() => {
                navigation.navigate("ProviderSelection");
              }}
            />
          </ScreenSafeView>
        </Wrapper>
      </ScreenScrollView>
    </ThemeProvider>
  );
}
