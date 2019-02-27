import java.lang.System;
import java.util.Properties;

import java.util.Iterator;
import java.util.Map.Entry;

public class SystemProperties {
    public static void main(String[] args) {
        Properties properties = System.getProperties();
        Iterator<Entry<Object, Object>> iterator = properties.entrySet().iterator();
        while (iterator.hasNext()) {
            Entry<Object, Object> entry = iterator.next();
            System.out.println(entry.getKey() + "===" + entry.getValue());
        }
    }
}